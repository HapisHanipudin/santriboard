import { prisma } from ".";

import { Gender } from "@prisma/client";

export async function createStudent(data: {
  name: string;
  nickname?: string;
  gender: string;
  birth_date: string | Date;
  birth_place: string;
  nis: string;
  nik: string;
  is_active?: boolean;
  is_graduated?: boolean;
  familiesId?: string;
}) {
  const {
    name,
    nickname,
    gender,
    birth_date,
    birth_place,
    nis,
    nik,
    is_active,
    is_graduated,
    familiesId,
  } = data;

  if (!name || !gender || !birth_date || !nis || !nik) {
    throw new Error("Invalid data format");
  }

  // Validasi familiesId jika diberikan
  let family = null;
  if (familiesId) {
    family = await prisma.families.findUnique({ where: { id: familiesId } });
    if (!family) {
      throw new Error("Family ID not found");
    }
  }

  return await prisma.students.create({
    data: {
      name,
      nickname,
      gender: gender.toUpperCase() as Gender,
      birth_date: new Date(birth_date),
      birth_place,
      nis,
      nik,
      is_active: is_active ?? true,
      is_graduated: is_graduated ?? false,
      familiesId: familiesId, // BUKAN families
    },
  });
}



export async function getAllStudents() {
  return await prisma.students.findMany();
}

export async function deleteStudent(id: string) {
  return await prisma.students.delete({
    where: { id },
  });
}

export async function updateStudent(id: string, data: any) {
  return await prisma.students.update({
    where: { id },
    data,
  });
}


/**
 * Mengambil peringkat berdasarkan kategori (division).
 */
export async function getStudentRankings(kategori: string) {
  if (!kategori) {
    throw new Error("Kategori harus disertakan dalam query parameter");
  }

  const students = await prisma.students.findMany({
    where: {
      classes: {
        some: {
          class: {
            division: {
              id: kategori,
            },
          },
        },
      },
    },
    include: {
      classes: {
        include: {
          evaluations: true,
          class: true,
        },
      },
    },
  });

  if (students.length === 0) {
    throw new Error("Tidak ada siswa yang ditemukan untuk kategori ini.");
  }

  const fields = ["TAHFIZH", "IT", "BAHASA", "KARAKTER"];

  const rankings: Record<string, { name: string; score: number }[]> =
    fields.reduce((acc, field) => {
      acc[field] = [];
      return acc;
    }, {} as Record<string, { name: string; score: number }[]>);

  students.forEach((student) => {
    const scores = student.classes.reduce((acc, c) => {
      const evaluationScores = c.evaluations.reduce((acc2, e) => {
        acc2[e.field] = (acc2[e.field] || 0) + e.score;
        return acc2;
      }, {} as Record<string, number>);
      return { ...acc, ...evaluationScores };
    }, {} as Record<string, number>);

    fields.forEach((field) => {
      rankings[field].push({ name: student.name, score: scores[field] || 0 });
    });
  });

  fields.forEach((field) => {
    rankings[field].sort((a, b) => b.score - a.score);
  });

  return rankings;
}

/**
 * Mendapatkan data lengkap satu student.
 */
export const getStudents = async (id: string) => {
  return await prisma.students.findUnique({
    where: { id },
    include: {
      family: true,
      achievements: {
        select: {
          title: true,
          description: true,
        },
      },
      projects: {
        select: {
          title: true,
          description: true,
          imageUrl: true,
        },
      },
      classes: {
        select: {
          evaluations: {
            select: {
              field: true,
              score: true,
            },
          },
          class: {
            select: {
              name: true,
              division: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });
};
