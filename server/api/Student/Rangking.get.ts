import { PrismaClient } from "@prisma/client";
import { defineEventHandler, getQuery } from "h3";

// Inisialisasi Prisma Client
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // const query = getQuery(event);

  // // Pastikan kategori adalah string
  // const kategori = typeof query.kategori === "string" ? query.kategori : "";

  // if (!kategori) {
  //   return {
  //     status: 400,
  //     message: "Kategori harus disertakan dalam query parameter",
  //   };
  // }

  // // Ambil data students berdasarkan kategori beserta evaluations-nya
  // const students = await prisma.students.findMany({
  //   where: {
  //     category: kategori,
  //   },
  //   select: {
  //     name: true,
  //     evaluations: {
  //       select: {
  //         field: true, // Field harus berupa: TAHFIZH, IT, BAHASA, KARAKTER
  //         score: true,
  //       },
  //     },
  //   },
  // });

  // // Jika tidak ada students ditemukan
  // if (students.length === 0) {
  //   return {
  //     status: 404,
  //     message: "Tidak ada siswa yang ditemukan untuk kategori ini.",
  //   };
  // }

  // // Definisikan bidang yang akan dirangking
  // const fields = ["TAHFIZH", "IT", "BAHASA", "KARAKTER"];

  // // Inisialisasi rankings dengan tipe yang tepat
  // const rankings: Record<string, { name: string; score: number }[]> = fields.reduce((acc, field) => {
  //   acc[field] = [];
  //   return acc;
  // }, {} as Record<string, { name: string; score: number }[]>);

  // // Proses setiap student
  // students.forEach((student: { name: string; evaluations: any[] }) => {
  //   // Hitung skor berdasarkan field
  //   const scores = student.evaluations.reduce((acc: Record<string, number>, evaluation: any) => {
  //     acc[evaluation.field] = (acc[evaluation.field] || 0) + evaluation.score;
  //     return acc;
  //   }, {} as Record<string, number>);

  //   // Tambahkan skor ke dalam rankings per field
  //   fields.forEach((field) => {
  //     rankings[field].push({ name: student.name, score: scores[field] || 0 });
  //   });
  // });

  // // Urutkan rankings berdasarkan skor tertinggi
  // fields.forEach((field) => {
  //   rankings[field].sort((a, b) => b.score - a.score);
  // });

  // // Kembalikan hasil ranking per bidang
  // return rankings;

  return "Hello World";
});
