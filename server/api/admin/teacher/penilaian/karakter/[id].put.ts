// server/api/admin/teacher/penilaian/karakter/[id].put.ts
import { defineEventHandler, readBody, getRouterParams } from "h3";
import { prisma } from "~/server/db";
import { AssessmentType, Frequency } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const body = await readBody(event);

  if (!id) {
    return {
      statusCode: 400,
      message: "Assessment ID is required",
    };
  }

  if (body.type !== AssessmentType.KARAKTER) {
    return {
      statusCode: 400,
      message: "Assessment type must be KARAKTER",
    };
  }

  const errorCount = typeof body.errorCount === "number" ? body.errorCount : 0;
  const repetitionCount = typeof body.repetitionCount === "number" ? body.repetitionCount : 0;
  const totalPenalty = errorCount + repetitionCount;
  const finalScore = Math.max(100 - totalPenalty, 0);

  const autoNote = `Dikurangi ${errorCount} karena kesalahan, ${repetitionCount} karena pengulangan`;

  try {
    // Update main assessment
    const updatedAssessment = await prisma.assessment.update({
      where: { id: Number(id) },
      data: {
        studentClassesId: body.studentClassesId,
        frequency: body.frequency as Frequency,
        score: finalScore,
        note: `${autoNote}${body.note ? " — " + body.note : ""}`,
      },
    });

    // Update or create detail
    const existingDetail = await prisma.assessmentDetail.findUnique({
      where: { assessmentId: Number(id) },
    });

    if (existingDetail) {
      await prisma.assessmentDetail.update({
        where: { assessmentId: Number(id) },
        data: { karakterAspect: body.karakterAspect },
      });
    } else {
      await prisma.assessmentDetail.create({
        data: {
          assessmentId: Number(id),
          karakterAspect: body.karakterAspect,
        },
      });
    }

    return {
      statusCode: 200,
      message: `Assessment karakter berhasil diperbarui. Skor akhir: ${finalScore}`,
      data: {
        id: updatedAssessment.id,
        studentClassesId: updatedAssessment.studentClassesId,
        type: updatedAssessment.type,
        frequency: updatedAssessment.frequency,
        score: updatedAssessment.score,
        note: updatedAssessment.note,
        detail: {
          karakterAspect: body.karakterAspect,
        },
      },
    };
  } catch (error: any) {
    console.error("Error updating karakter assessment:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message,
    };
  }
});
