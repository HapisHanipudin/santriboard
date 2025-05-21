import { prisma } from ".";

export async function createNote(data: { studentId: string; teacherId: string; note?: string }) {
  return prisma.notes.create({ data });
}

export async function getAllNotes() {
  return prisma.notes.findMany({
    include: {
      student: true,
      teacher: true,
    },
  });
}

export async function getNoteById(id: string) {
  return prisma.notes.findUnique({
    where: { id },
    include: {
      student: true,
      teacher: true,
    },
  });
}

export async function updateNote(id: string, data: { note?: string }) {
  return prisma.notes.update({ where: { id }, data });
}

export async function deleteNote(id: string) {
  return prisma.notes.delete({ where: { id } });
}
