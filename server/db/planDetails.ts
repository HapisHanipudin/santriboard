import { prisma } from ".";
import { PlanType } from "@prisma/client"; // Import enum PlanType

export async function createPlanDetails(data: {
  planId: string;
  type: PlanType;
  content: string;
}) {
  return prisma.planDetails.create({ data });
}

export async function getAllPlanDetails() {
  return prisma.planDetails.findMany();
}

export async function getPlanDetailsById(id: string) {
  return prisma.planDetails.findUnique({ where: { id } });
}

export async function updatePlanDetails(id: string, data: {
  type?: PlanType;
  content?: string;
}) {
  return prisma.planDetails.update({
    where: { id },
    data,
  });
}

export async function deletePlanDetails(id: string) {
  return prisma.planDetails.delete({ where: { id } });
}
