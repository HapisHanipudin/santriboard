import { defineEventHandler, readBody } from "h3";
import { updateAssessment } from "~/server/db/assessment";
import { AssessmentType } from "@prisma/client";

const allowedTypes = [AssessmentType.BAHASA_ARAB, AssessmentType.BAHASA_INGGRIS, AssessmentType.BAHASA_PDKI];

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { id } = getRouterParams(event);

    const assessmentId = Number(id);

    const { frequency, score, note, page, pageCount, bahasaAspect, type, errorCount, repetitionCount } = body;

    if (!assessmentId || isNaN(assessmentId)) {
      return {
        statusCode: 400,
        message: "Path parameter 'id' must be a valid number",
      };
    }

    if (!allowedTypes.includes(type)) {
      return {
        statusCode: 400,
        message: `Assessment type must be one of: ${allowedTypes.join(", ")}`,
      };
    }

    let finalScore = score;
    if (typeof errorCount === "number" || typeof repetitionCount === "number") {
      const totalPenalty = (errorCount || 0) + (repetitionCount || 0);
      finalScore = Math.max(100 - totalPenalty, 0);
    }

    const autoNote = `Dikurangi ${errorCount || 0} karena kesalahan, ${repetitionCount || 0} karena pengulangan`;
    const finalNote = note ? `${autoNote} — ${note}` : autoNote;

    const updated = await updateAssessment(assessmentId, {
      frequency,
      score: finalScore,
      note: finalNote,
      page,
      pageCount,
      bahasaAspect,
    });

    return {
      statusCode: 200,
      message: "Assessment bahasa berhasil diperbarui",
      data: updated,
    };
  } catch (error: any) {
    console.error("Error updating assessment bahasa:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message,
    };
  }
});
