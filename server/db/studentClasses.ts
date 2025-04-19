import { prisma } from "../db";

export async function createStudentClass(
  studentId: string,
  classId: string,
  semesterId: string
) {
  return await prisma.studentClasses.create({
    data: {
      studentId,
      classId,
      semesterId,
    },
  });
}
