import { prisma } from '../db';
import { Division, Frequency,Field  } from '@prisma/client';


export async function getAllClasses() {
  return prisma.classes.findMany({
    include: { division: true, teachers: true }
  });
}

export async function getClassById(id: string) {
  return prisma.classes.findUnique({
    where: { id },
    include: {
      division: true,
      teachers: { include: { teacher: true } },
      students: true
    }
  });
}

export async function getClassesByTeacher(
  teacherId: string,
  semesterId: string
) {
  return prisma.classes.findMany({
    where: {
      teachers: {
        some: {
          teacherId,
          semesterId,
        },
      },
      division: {
        name: Field.TAHFIZH, // enum Field, sesuai Divisions.name
      },
    },
    include: {
      division: true,
      teachers: { include: { teacher: true } },
      students: {
        include: {
          student: {
            include: {
              assessments: {
                where: { frequency: Frequency.HARIAN },
                orderBy: { createdAt: 'desc' },
              },
            },
          },
        },
      },
    },
  });
}



export async function createClass(data: { name: string; divisionId: string }) {
  return prisma.classes.create({ data });
}

export async function updateClass(
  id: string,
  data: { name?: string; divisionId?: string }
) {
  return prisma.classes.update({
    where: { id },
    data
  });
}

export async function deleteClass(id: string) {
  return prisma.classes.delete({ where: { id } });
}
