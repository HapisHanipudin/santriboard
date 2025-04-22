import { prisma } from "../db";
import type { Parents } from "@prisma/client";

/**
 * Mengambil semua data parents lengkap dengan relasi user dan family
 */
export async function listParents(): Promise<Parents[]> {
  return prisma.parents.findMany({
    include: { user: true, family: true },
  });
}

/**
 * Membuat data parent baru
 */
export async function createParent(data: {
  name: string;
  userId: string;
  familyId: string;
  nik: string;
}): Promise<Parents> {
  return prisma.parents.create({
    data,
    include: { user: true, family: true },
  });
}

/**
 * Mengambil detail parent berdasarkan ID
 */
export async function getParentById(id: string): Promise<Parents | null> {
  return prisma.parents.findUnique({
    where: { id },
    include: { user: true, family: true },
  });
}

/**
 * Memperbarui data parent (name, familyId atau nik)
 */
export async function updateParent(
  id: string,
  data: Partial<Pick<Parents, "name" | "familyId" | "nik">>
): Promise<Parents> {
  return prisma.parents.update({
    where: { id },
    data,
    include: { user: true, family: true },
  });
}

/**
 * Menghapus data parent berdasarkan ID
 */
export async function deleteParent(id: string): Promise<Parents> {
  return prisma.parents.delete({
    where: { id },
  });
}
