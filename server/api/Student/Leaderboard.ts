import { PrismaClient } from "@prisma/client";
import { defineEventHandler, getQuery } from "h3";

// Inisialisasi Prisma Client
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  // Pastikan plp adalah string
  const plp = typeof query.plp === "string" ? query.plp : "";

  if (!plp) {
    return {
      status: 400,
      message: "PLP harus disertakan dalam query parameter",
    };
  }

  // Ambil data students beserta kelas dan guru
  const students = await prisma.students.findMany({
    where: {
      plp_students: {
        some: {
          plp: {
            plp: plp, // Asumsikan plp adalah field di tabel Plps
          },
        },
      },
    },
    select: {
      name: true,
      classes: {
        select: {
          class: {
            select: {
              name: true, // Nama kelas
              teachers: {
                select: {
                  teacher: {
                    select: {
                      name: true, // Nama guru
                    },
                  },
                },
              },
            },
          },
        },
      },
      evaluations: {
        select: {
          field: true, // Field harus berupa: TAHFIZH, IT, BAHASA, KARAKTER
          score: true,
        },
      },
    },
  });

  // Jika tidak ada students ditemukan
  if (students.length === 0) {
    return {
      status: 404,
      message: "Tidak ada siswa yang ditemukan untuk PLP ini.",
    };
  }

  // Definisikan bidang yang akan dirangking
  const fields = ["TAHFIZH", "IT", "BAHASA", "KARAKTER"];

  // Inisialisasi rankings dengan tipe yang tepat
  const rankings: Record<string, { name: string; class: string; teacher: string; score: number }[]> = fields.reduce((acc, field) => {
    acc[field] = [];
    return acc;
  }, {} as Record<string, { name: string; class: string; teacher: string; score: number }[]>);

  // Proses setiap student
  students.forEach((student) => {
    // Hitung skor berdasarkan field
    const scores = student.evaluations.reduce((acc: Record<string, number>, evaluation) => {
      acc[evaluation.field] = (acc[evaluation.field] || 0) + evaluation.score;
      return acc;
    }, {} as Record<string, number>);

    // Ambil kelas dan guru
    const className = student.classes[0]?.class?.name || "N/A";
    const teacherName = student.classes[0]?.class?.teachers[0]?.teacher?.name || "N/A";

    // Tambahkan skor ke dalam rankings per field
    fields.forEach((field) => {
      rankings[field].push({
        name: student.name,
        class: className,
        teacher: teacherName,
        score: scores[field] || 0,
      });
    });
  });

  // Urutkan rankings berdasarkan skor tertinggi
  fields.forEach((field) => {
    rankings[field].sort((a, b) => b.score - a.score);
  });

  // Kembalikan hasil ranking per bidang dalam format yang diinginkan
  const result = fields.map((field) => ({
    field,
    students: rankings[field],
  }));

  return result;
});
