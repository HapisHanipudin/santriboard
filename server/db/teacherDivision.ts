import { prisma } from "../db";
import { TeacherRole } from "@prisma/client";

export async function assignTeacherToDivision(
  divisionId: string,
  teacherId: string,
  role: TeacherRole = "ASATIDZ"
) {
  return await prisma.teacherDivisions.create({
    data: {
      divisionId,
      teacherId,
      role,
    },
  });
}

export async function removeTeacherFromDivision(
  divisionId: string,
  teacherId: string
) {
  return await prisma.teacherDivisions.delete({
    where: {
      teacherId_divisionId: {
        divisionId,
        teacherId,
      },
    },
  });
}

export async function getTeachersByDivision(divisionId: string) {
    try {
      const teachers = await prisma.teacherDivisions.findMany({
        where: {
          divisionId,
        },
        include: {
          teacher: true, // Menyertakan data lengkap guru
        },
      });
  
      return teachers.map((teacherDivision) => teacherDivision.teacher);
    } catch (error) {
        throw new Error("Failed to get teachers by division");
    }
  }