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
    teacherId: string
  ) {
    return await prisma.teacherClasses.delete({
      where: { teacherId_classId: { classId, teacherId } }
    });
  }


export async function updateTeacherClassAssignment(
  classId: string,
  teacherId: string,
  semesterId: string
) {
  return await prisma.teacherClasses.update({
    where: { teacherId_classId: { classId, teacherId } },
    data: { semesterId }
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
  