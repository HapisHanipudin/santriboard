// server/db/plan.ts
import { prisma } from "../db";

export async function getPlansByStudentId(studentId: string) {
  return await prisma.plans.findMany({
    where: { student_id: studentId },
  });
}

export async function createPlan(studentId: string, title: string) {
  return await prisma.plans.create({
    data: {
      student_id: studentId,
      title,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
}

export async function getPlanDetails(planId: string) {
  return await prisma.planDetails.findMany({
    where: { plan_id: planId },
  });
}
