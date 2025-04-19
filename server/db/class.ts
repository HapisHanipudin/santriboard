import { prisma } from "../db";

export async function createClassWithTeachers(
  name: string,
  divisionId: string,
  semesterId: string,
  teachers: { teacherId: string }[]
) {
  // 1. Buat kelas
  const newClass = await prisma.classes.create({
    data: {
      name,
      divisionId,
    },
  });

  // 2. Buat relasi ke TeacherClasses
  await prisma.teacherClasses.createMany({
    data: teachers.map((teacher) => ({
      teacherId: teacher.teacherId,
      classId: newClass.id,
      semesterId,
    })),
  });

  return newClass;
}
