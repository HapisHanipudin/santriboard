import { defineEventHandler, getQuery } from "h3";
import { prisma } from "~/server/db";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const studentClassesId = id as string;

  if (!studentClassesId) {
    return {
      statusCode: 400,
      message: "Missing studentClassesId query parameter",
    };
  }

  try {
    const assessments = await prisma.assessment.findMany({
      where: {
        studentClassesId,
        type: "TAHFIZH",
      },
      orderBy: [{ frequency: "asc" }, { createdAt: "desc" }],
      include: {
        detail: true,
      },
    });

    // Mapping ulang untuk memastikan output sesuai format contoh
    const mappedData = assessments.map((item) => ({
      id: item.id,
      studentClassesId: item.studentClassesId,
      type: item.type,
      frequency: item.frequency,
      score: item.score,
      note: item.note,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      detail: item.detail
        ? {
            id: item.detail.id,
            page: item.detail.page,
            pageCount: item.detail.pageCount,
          }
        : null,
    }));

    return {
      statusCode: 200,
      data: mappedData,
    };
  } catch (error: any) {
    console.error("Error fetching TAHFIZH assessments:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message,
    };
  }
});
