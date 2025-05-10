import { prisma } from "../db";
import type { Field } from "@prisma/client";

export async function getDivisions() {
    return prisma.divisions.findMany();
  }

export async function createDivision(name: Field) {
  return prisma.divisions.create({
    data: { name }
  });
}

export async function updateDivision(id: string, name: Field) {
  return prisma.divisions.update({
    where: { id },
    data: { name }
  });
}

export async function deleteDivision(id: string) {
  return prisma.divisions.delete({
    where: { id }
  });
}
