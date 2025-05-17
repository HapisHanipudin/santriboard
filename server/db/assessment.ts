import { prisma } from ".";
import { Division, Frequency } from '@prisma/client';

/**
 * Create a daily tahfidz deposit (setoran) record
 */
export async function createDailyassessment(
  studentClassesId: string,
  division: Division,
  score: number = 100,
  note?: string
) {
  return prisma.assessment.create({
    data: {
      studentClassesId,
      division,
      frequency: Frequency.HARIAN,
      score,
      note,
    },
  });
}

/**
 * Update an existing assessment record
 */
export async function updateassessment(
  id: number,
  score: number,
  note?: string
) {
  return prisma.assessment.update({
    where: { id },
    data: { score, note },
  });
}

/**
 * Delete a assessment record
 */
export async function deleteassessment(id: number) {
  return prisma.assessment.delete({
    where: { id },
  });
}