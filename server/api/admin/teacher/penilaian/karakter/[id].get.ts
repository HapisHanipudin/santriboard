// server/api/admin/teacher/penilaian/karakter.ts
import { defineEventHandler, getQuery } from "h3";
import { prisma } from "~/server/db";
import { AssessmentType } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const studentClassesId = id as string;

  if (!studentClassesId) {
    return {
      statusCode: 400,
      message: "studentClassesId is required",
    };
  }

  try {
    const assessments = await prisma.assessment.findMany({
      where: {
        studentClassesId,
        type: AssessmentType.KARAKTER,
      },
      include: {
        detail: true, // tetap ambil meski null
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // mapping semua data, termasuk yang tidak punya detail
    const filteredData = assessments.map((a) => ({
      id: a.id,
      studentClassesId: a.studentClassesId,
      type: a.type,
      frequency: a.frequency,
      score: a.score,
      note: a.note,
      detail: a.detail
        ? {
            id: a.detail.id,
            karakterAspect: a.detail.karakterAspect,
            assessmentId: a.detail.assessmentId,
          }
        : null,
    }));

    return {
      statusCode: 200,
      message: `Berhasil mengambil ${filteredData.length} data assessment karakter`,
      data: filteredData,
    };
  } catch (error: any) {
    console.error("Error fetching karakter assessments:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message,
    };
  }
});
