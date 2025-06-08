import { prisma } from ".";
export async function getSemesters() {
  return await prisma.semesters.findMany();
}

export async function getSemesterById(id: string) {
  return await prisma.semesters.findUnique({ where: { id } });
}

export const getLatestSemester = async () => {
  return await prisma.semesters.findFirst({
    orderBy: { semester: "desc" },
  });
};

export async function createSemester(data: { semester: number; period: string }) {
  return await prisma.semesters.create({ data });
}

export async function updateSemester(id: string, data: Partial<{ semester: number; period: string }>) {
  return await prisma.semesters.update({ where: { id }, data });
}

export async function deleteSemester(id: string) {
  return await prisma.semesters.delete({ where: { id } });
}
