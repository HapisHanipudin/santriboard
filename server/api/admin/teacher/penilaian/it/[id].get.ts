import { defineEventHandler, getQuery } from 'h3';
import { prisma } from "~/server/db";
import { AssessmentType } from '@prisma/client';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const studentClassesId = query.studentClassesId as string | undefined;

  if (!studentClassesId) {
    return {
      statusCode: 400,
      message: 'studentClassesId query parameter is required',
    };
  }

  try {
    const assessments = await prisma.assessment.findMany({
      where: {
        studentClassesId,
        type: AssessmentType.IT,
      },
      include: {
        detail: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Format ulang output agar sesuai contoh
    const formattedData = assessments.map(a => ({
      id: a.id,
      studentClassesId: a.studentClassesId,
      type: a.type,
      frequency: a.frequency,
      score: a.score,
      note: a.note,
      detail: a.detail
        ? {
            id: a.detail.id,
            itTopic: a.detail.itTopic,
            completion: a.detail.completion,
            assessmentId: a.detail.assessmentId,
          }
        : null,
    }));

    return {
      statusCode: 200,
      message: `Found ${assessments.length} IT assessments`,
      data: formattedData,
    };
  } catch (error: any) {
    console.error('Error fetching IT assessments:', error);
    return {
      statusCode: 500,
      message: 'Internal Server Error',
      error: error.message,
    };
  }
});
