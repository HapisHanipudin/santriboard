import { defineEventHandler, getQuery } from "h3";
import { prisma } from "~/server/db";
import { AssessmentType } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const studentClassesId = query.studentClassesId as string;

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
        type: {
          in: [
            AssessmentType.BAHASA_ARAB,
            AssessmentType.BAHASA_INGGRIS,
            AssessmentType.BAHASA_PDKI,
          ],
        },
      },
      include: {
        detail: true,
      },
    });

    const filteredData = assessments.map((a) => ({
      id: a.id,
      type: a.type,
      frequency: a.frequency,
      score: a.score,
      note: a.note,
      detail: a.detail
        ? {
            id: a.detail.id,
            bahasaAspect: a.detail.bahasaAspect,
            assessmentId: a.detail.assessmentId,
          }
        : null,
    }));

    return {
      statusCode: 200,
      message: "Berhasil mengambil data assessment bahasa",
      data: filteredData,
    };
  } catch (error: any) {
    console.error("Error fetching bahasa assessments:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message,
    };
  }
});
