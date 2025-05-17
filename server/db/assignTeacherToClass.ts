import { prisma } from "../db";
import { PrismaClient,TeacherClasses as TeacherClasses } from '@prisma/client';

export async function assignTeacherToClass(
  classId: string,
  teacherId: string,
  semesterId: string
) {
  if (!classId || !teacherId || !semesterId) {
    throw new Error("Missing required field(s)");
  }

  return await prisma.teacherClasses.create({
    data: { classId, teacherId, semesterId },
  });
}

export async function removeTeacherFromClassById(id: string) {
  if (!id) {
    throw new Error('id is required');
  }
  
  return await prisma.teacherClasses.delete({
    where: { id }
  });
}




export async function updateTeacherClassAssignment(
  classId: string,
  teacherId: string,
  semesterId: string,
  dataToUpdate: Partial<Omit<TeacherClasses, 'classId' | 'teacherId' | 'semesterId'>>
) {
  // cek dulu apakah record ada
  const existing = await prisma.teacherClasses.findUnique({
    where: {
      teacherId_classId_semesterId: {
        classId,
        teacherId,
        semesterId,
      }
    }
  });

  if (!existing) {
    throw new Error("Record to update not found");
  }

  return await prisma.teacherClasses.update({
    where: {
      teacherId_classId_semesterId: {
        classId,
        teacherId,
        semesterId,
      }
    },
    data: dataToUpdate
  });
}






export async function getTeachersByClass(
    classId: string
  ) {
    return await prisma.teacherClasses.findMany({
      where: { classId },
      include: { teacher: true, semester: true }
    });
  }
  