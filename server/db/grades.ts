import { prisma } from "../db";

export async function getAllGrades() {
  return prisma.grades.findMany();
}

export async function createGrade(grade: string, type?: string) {
  return prisma.grades.create({
    data: {
      grade,
      type,
    },
  });
}

export async function assignGradeToStudent(studentId: string, semesterId: string, gradeId: string) {
  return prisma.gradeStudents.create({
    data: {
      student_id: studentId,
      semester_id: semesterId,
      grade_id: gradeId,
    },
  });
}

export async function getStudentGradesBySemester(studentId: string) {
  return prisma.gradeStudents.findMany({
    where: {
      student_id: studentId,
    },
    include: {
      grade: true,
      semester: true,
    },
    orderBy: {
      semester: {
        semester: "asc",
      },
    },
  });
}
