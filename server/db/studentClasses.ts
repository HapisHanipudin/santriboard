import { prisma } from "../db";

export async function assignStudentToClass(studentId: string, classId: string, semesterId: string) {
  return await prisma.studentClasses.create({
    data: {
      studentId,
      classId,
      semesterId,
    },
  });
}

export const assignStudentsToClass = async ({ students, classId, semesterId }: { students: string[]; classId: string; semesterId: string }) => {
  return await prisma.studentClasses.createMany({
    data: students.map((studentId) => ({
      studentId,
      classId,
      semesterId,
    })),
  });
};
