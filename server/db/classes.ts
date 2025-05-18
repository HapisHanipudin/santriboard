import { prisma } from '../db';
import { Division, Frequency,Field  } from '@prisma/client';


export async function getAllClasses() {
  const allClasses = await prisma.classes.findMany({
    include: {
      division: true,
      teachers: {
        include: { teacher: true },
      },
    },
    orderBy: [
      {
        division: {
          name: 'asc',
        },
      },
      {
        name: 'asc',
      },
    ],
  });

  const grouped: Record<string, { division: string; classes: any[] }> = {};

  for (const cls of allClasses) {
    const divisionName = cls.division?.name || 'Tanpa Divisi';
    if (!grouped[divisionName]) {
      grouped[divisionName] = {
        division: divisionName,
        classes: [],
      };
    }
    grouped[divisionName].classes.push(cls);
  }

  // Konversi objek ke array
  return Object.values(grouped);
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
