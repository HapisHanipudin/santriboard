import { prisma } from "../db";

export async function createClassWithTeachers(
  name: string,
  divisionId: string,
  semesterId: string,
  teachers: { teacherId: string }[]
) {
  const newClass = await prisma.classes.create({
    data: {
      name,
      divisionId,
    },
  });

  await prisma.teacherClasses.createMany({
    data: teachers.map((teacher) => ({
      teacherId: teacher.teacherId,
      classId: newClass.id,
      semesterId,
    })),
  });

  return newClass;
}
