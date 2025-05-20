import { defineEventHandler, readBody } from "h3";
import { prisma } from "~/server/db";

export default defineEventHandler(async (event) => {
  try {
    const id = Number(event.context.params?.id);

    if (!id) {
      return {
        statusCode: 400,
        message: "Missing assessment id in params",
      };
    }

    const body = await readBody(event);
    const {
      studentClassesId,
      frequency,
      page,
      pageCount,
      mistakeCount,
      repeatedCount,
      type,
      note,
      score,
    } = body;

    if (type !== "TAHFIZH") {
      return {
        statusCode: 400,
        message: "Only TAHFIZH assessments can be updated here",
      };
    }

    const existing = await prisma.assessment.findUnique({
      where: { id },
      include: { detail: true },
    });

    if (!existing) {
      return {
        statusCode: 404,
        message: "Assessment not found",
      };
    }

    if (existing.type !== "TAHFIZH") {
      return {
        statusCode: 400,
        message: "Assessment type mismatch, must be TAHFIZH",
      };
    }

    const combinedNote = `Dikurangi ${mistakeCount} karena kesalahan, ${repeatedCount} karena pengulangan — ${note}`;

    const updatedAssessment = await prisma.assessment.update({
      where: { id },
      data: {
        studentClassesId,
        frequency,
        note: combinedNote,
        score,
      },
      include: { detail: true },
    });

    if (page !== undefined && pageCount !== undefined) {
      console.log("updatedAssessment.detail:", updatedAssessment.detail);
      if (updatedAssessment.detail) {
        await prisma.assessmentDetail.update({
          where: { id: updatedAssessment.detail.id },
          data: { page, pageCount },
        });
      } else {
        await prisma.assessmentDetail.create({
          data: { assessmentId: id, page, pageCount },
        });
      }
    }

    const finalAssessment = await prisma.assessment.findUnique({
      where: { id },
      include: { detail: true },
    });

    return {
      statusCode: 200,
      data: finalAssessment,
    };
  } catch (error: any) {
    console.error("Error updating TAHFIZH assessment:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message,
    };
  }
});
