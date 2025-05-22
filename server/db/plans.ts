// server/db/plan.ts
import { prisma } from "../db";

export async function getPlansByStudentId(studentId: string) {
  return await prisma.plans.findMany({
    where: { studentId }, // ✅ camelCase
  });
}


export async function createPlan(studentId: string, title: string) {
  return await prisma.plans.create({
    data: {
      studentId, // ✅ camelCase
      title,
      createdAt: new Date(), // ✅ camelCase
      updatedAt: new Date(), // ✅ camelCase
    },
  });
}


export async function getPlanDetails(planId: string) {
  return await prisma.planDetails.findMany({
    where: { planId }, // ✅ camelCase
  });
}

