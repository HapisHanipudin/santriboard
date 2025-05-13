import { prisma } from ".";
export async function getSemesters() {
    return prisma.semesters.findMany();
  }
  
  export async function getSemesterById(id: string) {
    return prisma.semesters.findUnique({ where: { id } });
  }
  
  export async function createSemester(data: {
    semester: number;
    period: string;
  }) {
    return prisma.semesters.create({ data });
  }
  

  export async function updateSemester(
    id: string,
    data: Partial<{ semester: number; period: string }>
  ) {
    return prisma.semesters.update({ where: { id }, data });
  }
  
  export async function deleteSemester(id: string) {
    return prisma.semesters.delete({ where: { id } });
  }
  