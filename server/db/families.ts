import { prisma } from "../db";

export interface FamilyCreateInput {
  kk: string;
  father_name: string;
  mother_name: string;
  father_job?: string;
  mother_job?: string;
  children: number;
  address?: string;
}

export interface FamilyUpdateInput {
  kk?: string;
  father_name?: string;
  mother_name?: string;
  father_job?: string;
  mother_job?: string;
  children?: number;
  address?: string;
}

export async function getAllFamilies() {
  return await prisma.families.findMany();
}

export async function createFamily(data: FamilyCreateInput) {
  const existing = await prisma.families.findUnique({
    where: { kk: data.kk },
  });

  if (existing) {
    throw new Error("Nomor KK sudah terdaftar.");
  }

  return prisma.families.create({ data });
}

export async function getFamilyById(id: string) {
  return prisma.families.findUnique({ where: { id } });
}

export async function updateFamily(id: string, data: FamilyUpdateInput) {
  return prisma.families.update({
    where: { id },
    data,
  });
}

export async function deleteFamily(id: string) {
  return prisma.families.delete({ where: { id } });
}
