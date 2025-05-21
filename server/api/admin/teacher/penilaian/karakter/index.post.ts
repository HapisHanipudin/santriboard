import { defineEventHandler, readBody } from "h3";
import { createAssessment } from "~/server/db/assessment";
import { AssessmentType, Frequency } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (body.type !== AssessmentType.KARAKTER) {
    return {
      statusCode: 400,
      message: "Assessment type must be KARAKTER",
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
      type: AssessmentType.KARAKTER,
      frequency: body.frequency as Frequency,
      score: finalScore,
      note: `${autoNote}${body.note ? " — " + body.note : ""}`,
      karakterAspect: body.karakterAspect,
    });

    return {
      statusCode: 200,
      message: `Assessment karakter berhasil dibuat. Skor akhir: ${finalScore}`,
      data: {
        id: assessment.id,
        studentClassesId: assessment.studentClassesId,
        type: assessment.type,
        frequency: assessment.frequency,
        score: assessment.score,
        note: assessment.note,
        detail: {
          id: assessment.id,
          karakterAspect: assessment.detail?.karakterAspect ?? null,
        },
      },
    };
  } catch (error: any) {
    console.error("Error creating karakter assessment:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message,
    };
  }
});
