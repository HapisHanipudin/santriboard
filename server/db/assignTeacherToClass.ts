import { prisma } from "../db";


export async function assignTeacherToClass(
  classId: string,
  teacherId: string,
  semesterId: string
) {
  return await prisma.teacherClasses.create({
    data: { classId, teacherId, semesterId }
  });
}


export async function removeTeacherFromClass(
  classId: string,
  teacherId: string,
  semesterId: string
) {
  return await prisma.teacherClasses.delete({
    where: {
      teacherId_classId_semesterId: {
        classId,
        teacherId,
        semesterId
      }
    }
  });
}



export async function updateTeacherClassAssignment(
  classId: string,
  teacherId: string,
  semesterId: string
) {
  return await prisma.teacherClasses.update({
    where: {
      teacherId_classId_semesterId: {
        classId,
        teacherId,
        semesterId
      }
    },
    data: { semesterId } // Atau field lain kalau semesterId gak berubah
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
  