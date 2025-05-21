// server/api/admin/teacher/penilaian/bahasa.ts
import { defineEventHandler, readBody } from "h3";
import { createAssessment } from "~/server/db/assessment";
import { AssessmentType, Frequency } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (
    ![AssessmentType.BAHASA_ARAB, AssessmentType.BAHASA_INGGRIS, AssessmentType.BAHASA_PDKI].includes(body.type)
  ) {
    return {
      statusCode: 400,
      message: "Assessment type must be one of the BAHASA types",
    };
  }

  if (!body.studentClassesId || !body.frequency) {
    return {
      statusCode: 400,
      message: "studentClassesId and frequency are required",
    };
  }

  const errorCount = typeof body.errorCount === "number" ? body.errorCount : 0;
  const repetitionCount = typeof body.repetitionCount === "number" ? body.repetitionCount : 0;
  const totalPenalty = errorCount + repetitionCount;
  const finalScore = Math.max(100 - totalPenalty, 0);

  const autoNote = `Dikurangi ${errorCount} karena kesalahan, ${repetitionCount} karena pengulangan`;

  try {
    const assessment = await createAssessment({
      studentClassesId: body.studentClassesId,
      type: body.type,
      frequency: body.frequency as Frequency,
      score: finalScore,
      note: `${autoNote}${body.note ? " — " + body.note : ""}`,
      bahasaAspect: body.bahasaAspect,
    });

    return {
      statusCode: 200,
      message: `Assessment bahasa berhasil dibuat. Skor akhir: ${finalScore}`,
      data: {
        id: assessment.id,
        studentClassesId: assessment.studentClassesId,
        type: assessment.type,
        frequency: assessment.frequency,
        score: assessment.score,
        note: assessment.note,
        detail: {
          id: assessment.id,
          bahasaAspect: assessment.detail?.bahasaAspect ?? null,
        },
      },
    };
  } catch (error: any) {
    console.error("Error creating bahasa assessment:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message,
    };
  }
});
