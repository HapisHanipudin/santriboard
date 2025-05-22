import { prisma } from "../db";
import type { Field } from "@prisma/client";

export async function getDivisions() {
  return await prisma.divisions.findMany();
}

export async function createDivision(name: Field) {
  return await prisma.divisions.create({
    data: { name },
  });
}
export async function getDivisionById(id: string) {
  return await prisma.divisions.findUnique({
    where: { id },
  });
}

export async function updateDivision(id: string, name: Field) {
  return await prisma.divisions.update({
    where: { id },
    data: { name },
  });
}

export async function deleteDivision(id: string) {
  return await prisma.divisions.delete({
    where: { id },
  });
}
