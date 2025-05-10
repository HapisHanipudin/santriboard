import { prisma } from "../db";

export async function assignStudentToClass(
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
