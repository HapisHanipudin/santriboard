import { prisma } from ".";
import { Frequency, AssessmentType } from "@prisma/client";


export async function createAssessment(data: {
  studentClassesId: string;
  type: AssessmentType;  // harus enum, bukan string biasa
  frequency: Frequency;
  score: number;
  note?: string;

  page?: string;
  pageCount?: number;
  bahasaAspect?: string;
  karakterAspect?: string;
  itTopic?: string;
}) {
  const {
    page,
    pageCount,
    bahasaAspect,
    karakterAspect,
    itTopic,
    type,
    frequency,
    ...assessmentData
  } = data;

  const hasDetail = 
    page !== undefined || pageCount !== undefined || bahasaAspect !== undefined || 
    karakterAspect !== undefined || itTopic !== undefined;

  const detailData: any = {};
  if (page !== undefined) detailData.page = page;
  if (pageCount !== undefined) detailData.pageCount = pageCount;
  if (bahasaAspect !== undefined) detailData.bahasaAspect = bahasaAspect;
  if (karakterAspect !== undefined) detailData.karakterAspect = karakterAspect;
  if (itTopic !== undefined) detailData.itTopic = itTopic;

  const assessment = await prisma.assessment.create({
    data: {
      ...assessmentData,
      type,       // pastikan properti type disertakan di sini
      frequency,  // pastikan frequency juga disertakan
      detail: hasDetail ? { create: detailData } : undefined,
    },
    include: {
      detail: true,
    },
  });

  return assessment;
}



export async function getItTopicsCompletionByStudentAndFrequency(studentClassesId: string, frequency: Frequency) {
  return prisma.assessmentDetail.findMany({
    where: {
      assessment: {
        studentClassesId,
        frequency,
        type: "IT", // pastikan hanya untuk IT
      },
    },
    select: {
      completion: true, // nilai persen (0-100)
    },
  });
}


export async function updateAssessment(
  assessmentId: number,
  data: {
    frequency?: Frequency;
    score?: number;
    note?: string;

    // Detail opsional untuk AssessmentDetail
    page?: string;
    pageCount?: number;
    bahasaAspect?: string;
    karakterAspect?: string;
    itTopic?: string;
  }
) {
  const existing = await prisma.assessment.findUnique({
    where: { id: assessmentId },
    include: { detail: true },
  });
  if (!existing) {
    throw new Error(`Assessment with id ${assessmentId} not found.`);
  }

  // Update data Assessment utama
  const updateData: Record<string, any> = {};
  if (data.frequency !== undefined) updateData.frequency = data.frequency;
  if (data.score !== undefined) updateData.score = data.score;
  if (data.note !== undefined) updateData.note = data.note;

  // Update atau buat data detail AssessmentDetail
  if (
    data.page !== undefined ||
    data.pageCount !== undefined ||
    data.bahasaAspect !== undefined ||
    data.karakterAspect !== undefined ||
    data.itTopic !== undefined
  ) {
    if (existing.detail) {
      // update existing detail
      updateData.detail = {
        update: {
          page: data.page,
          pageCount: data.pageCount,
          bahasaAspect: data.bahasaAspect,
          karakterAspect: data.karakterAspect,
          itTopic: data.itTopic,
        },
      };
    } else {
      // create new detail
      updateData.detail = {
        create: {
          page: data.page,
          pageCount: data.pageCount,
          bahasaAspect: data.bahasaAspect,
          karakterAspect: data.karakterAspect,
          itTopic: data.itTopic,
        },
      };
    }
  }

  return prisma.assessment.update({
    where: { id: assessmentId },
    data: updateData,
    include: { detail: true },
  });
}

export async function deleteAssessment(id: number) {
  const existing = await prisma.assessment.findUnique({ where: { id } });
  if (!existing) {
    throw new Error(`Assessment with id ${id} not found`);
  }

  return prisma.assessment.delete({ where: { id } });
}

export async function getAssessments(
  studentClassesId: string,
  frequency?: Frequency,
  type?: AssessmentType
) {
  return prisma.assessment.findMany({
    where: {
      studentClassesId,
      ...(frequency && { frequency }),
      ...(type && { type }),
    },
    orderBy: [
      { frequency: "asc" },
      { createdAt: "desc" },
    ],
    include: {
      detail: true,
    },
  });
}


export async function getScoreSummary(studentClassesId: string) {
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