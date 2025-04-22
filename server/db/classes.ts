import { prisma } from '../db';

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
