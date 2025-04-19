import { prisma } from ".";




export async function assignStudentToClass(studentId: string, classId: string, semesterId: string) {
  if (!studentId || !classId || !semesterId) {
    throw new Error("Missing required fields");
  }

  return await prisma.$transaction(async (tx) => {
    // Validasi apakah student, class, dan semester ada dalam database
    await tx.students.findUniqueOrThrow({ where: { id: studentId } });
    await tx.classes.findUniqueOrThrow({ where: { id: classId } });
    await tx.semesters.findUniqueOrThrow({ where: { id: semesterId } });

    // Cek apakah sudah ada entri yang sama
    const existingEntry = await tx.studentClasses.findFirst({
      where: { studentId, classId, semesterId },
    });

    if (existingEntry) {
      throw new Error("Student is already assigned to this class for the given semester.");
    }

    // Menambahkan siswa ke dalam kelas pada semester tertentu
    return await tx.studentClasses.create({
      data: { studentId, classId, semesterId },
    });
  });
}


export async function createStudent(studentId: string, data: any) {
  const { name, nickname, gender, birth_date, birth_place, nis, nik, is_active, is_graduated, familiesId } = data;

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

  const student = await prisma.students.create({
    data: {
      name,
      nickname,
      gender,
      birth_date: new Date(birth_date),
      birth_place,
      nis,
      nik,
      is_active: is_active ?? true,
      is_graduated: is_graduated ?? false,
      familiesId: family ? familiesId : null,
    },
  });

  return student;
}
export async function getStudentRankings(kategori: string) {
  if (!kategori) {
    throw new Error("Kategori harus disertakan dalam query parameter");
  }

  // Ambil data students berdasarkan kategori beserta evaluations-nya
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

  // Definisikan bidang yang akan dirangking
  const fields = ["TAHFIZH", "IT", "BAHASA", "KARAKTER"];

  // Inisialisasi rankings dengan tipe yang tepat
  const rankings: Record<string, { name: string; score: number }[]> =
    fields.reduce((acc, field) => {
      acc[field] = [];
      return acc;
    }, {} as Record<string, { name: string; score: number }[]>);

  // Proses setiap student
  students.forEach((student) => {
    // Hitung skor berdasarkan field
    const scores = student.classes.reduce((acc, c) => {
      const evaluationScores = c.evaluations.reduce((acc2, e) => {
        acc2[e.field] = (acc2[e.field] || 0) + e.score;
        return acc2;
      }, {} as Record<string, number>);
      return { ...acc, ...evaluationScores };
    }, {} as Record<string, number>);

    // Tambahkan skor ke dalam rankings per field
    fields.forEach((field) => {
      rankings[field].push({ name: student.name, score: scores[field] || 0 });
    });
  });

  // Urutkan rankings berdasarkan skor tertinggi
  fields.forEach((field) => {
    rankings[field].sort((a, b) => b.score - a.score);
  });

  return rankings;
}

export const getStudents = async (id: string) => {
  return await prisma.students.findUnique({
    where: { id },
    include: {
      family: true, // Menyertakan relasi keluarga
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
              name: true, // Nama kelas
              division: {
                select: {
                  name: true, // Nama division
                },
              },
            },
          },
        },
      },
    },
  });
};
