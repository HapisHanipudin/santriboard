import { defineEventHandler, readBody } from "h3";
import { AssessmentType } from "@prisma/client";
import { prisma } from "~/server/db";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  if (!id) {
    return {
      statusCode: 400,
      message: "Assessment ID is required",
    };
  }

  try {
    const assessment = await prisma.assessment.findUnique({
      where: { id: Number(id) },
      select: { id: true, type: true },
    });

    if (!assessment) {
      return {
        statusCode: 404,
        message: "Assessment not found",
      };
    }

    if (
      assessment.type === AssessmentType.BAHASA_ARAB ||
      assessment.type === AssessmentType.BAHASA_INGGRIS ||
      assessment.type === AssessmentType.BAHASA_PDKI
    ) {
      // ...
    } else {
      return {
        statusCode: 403,
        message: "Hanya assessment bertipe BAHASA yang bisa dihapus",
      };
    }

    await prisma.assessment.delete({
      where: { id: Number(id) },
    });

    return {
      statusCode: 200,
      message: `Assessment dengan ID ${id} berhasil dihapus`,
    };
  } catch (error: any) {
    console.error("Error deleting bahasa assessment:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message,
    };
  }
});
