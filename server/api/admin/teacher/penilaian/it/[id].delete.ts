import { defineEventHandler } from 'h3';
import { prisma } from "~/server/db";
import { AssessmentType } from '@prisma/client';
import { getRouterParams } from 'h3'; // pastikan fungsi ini tersedia di environmentmu

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  if (!id) {
    return {
      statusCode: 400,
      message: "Assessment ID is required",
    };
  }

  const assessmentId = Number(id);
  if (isNaN(assessmentId)) {
    return {
      statusCode: 400,
      message: "Assessment ID must be a valid number",
    };
  }

  try {
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      select: { id: true, type: true },
    });

    if (!assessment) {
      return {
        statusCode: 404,
        message: "Assessment not found",
      };
    }

    if (assessment.type !== AssessmentType.IT) {
      return {
        statusCode: 400,
        message: "Only IT assessments can be deleted with this endpoint",
      };
    }

    await prisma.assessment.delete({
      where: { id: assessmentId },
    });

    return {
      statusCode: 200,
      message: `Assessment IT with id ${assessmentId} deleted successfully`,
    };
  } catch (error: any) {
    console.error("Error deleting assessment IT:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message,
    };
  }
});
