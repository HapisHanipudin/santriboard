import { prisma } from ".";
import { Division, Frequency } from "@prisma/client";

export async function createTahfizhAssessment(data: {
  studentClassesId: string;
  frequency: Frequency;
  page: string;
  pagecount: number;
  score: number;
  note?: string;
}) {
  return prisma.assessment.create({
    data,
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
  const existing = await prisma.assessment.findUnique({ where: { id } });
  if (!existing) {
    throw new Error(`Assessment with id ${id} not found`);
  }

  return prisma.assessment.delete({ where: { id } });
}




export async function getTahfidzAssessments(
  studentClassesId: string,
  frequency?: Frequency
) {
  return prisma.assessment.findMany({
    where: {
      studentClassesId,
      ...(frequency && { frequency }),
    },
    orderBy: [
      { frequency: "asc" },     // urutkan berdasarkan jenis frequency
      { createdAt: "desc" },    // lalu urutkan berdasarkan tanggal terbaru
    ],
  });
}

export async function getTahfidzScoreSummary(studentClassesId: string) {
  const assessments = await prisma.assessment.findMany({
    where: {
      studentClassesId,
    },
  });

  const grouped: Record<Frequency, number[]> = {
    HARIAN: [],
    MINGGUAN: [],
    BULANAN: [],
  };

  for (const a of assessments) {
    const freq = a.frequency as Frequency;
    if (grouped[freq]) {
      grouped[freq].push(a.score);
    }
  }

  const average = (arr: number[]) =>
    arr.length > 0
      ? Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 100) / 100
      : null;

  return {
    dailyAvg: average(grouped.HARIAN),
    weeklyAvg: average(grouped.MINGGUAN),
    monthlyAvg: average(grouped.BULANAN),
    finalScore: average([
      ...grouped.HARIAN,
      ...grouped.MINGGUAN,
      ...grouped.BULANAN,
    ]),
  };
}
