import { prisma } from "../db";

export async function createTeacher(
  name: string,
  divisions: { divisionId: string; role: string }[]
) {
  if (!name || !divisions || !Array.isArray(divisions)) {
    throw new Error("Invalid data format");
  }

  // Membuat teacher baru
  const teacher = await prisma.teachers.create({
    data: {
      name,
      nik: `NIK${Date.now()}`, // Dummy NIK
    },
  });

  // Membuat relasi teacherDivisions
  await prisma.teacherDivisions.createMany({
    data: divisions.map((division) => ({
      teacherId: teacher.id,
      divisionId: division.divisionId,
      role: division.role as any, // Enum TeacherRole
    })),
  });

  return teacher;
}
