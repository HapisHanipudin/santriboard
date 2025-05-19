import { defineEventHandler, readBody, sendError, createError } from "h3";
import { createAssessment } from "../../../../db/assessment";

export default defineEventHandler(async (event) => {
  try {
    const { studentClassesId, frequency, page, type, pageCount, mistakeCount = 0, repeatedCount = 0, note } = await readBody(event);

    if (!studentClassesId || !frequency || !page || !pageCount) {
      throw new Error("Missing required fields: studentClassesId, frequency, page, or pageCount.");
    }

    const baseScore = 100;
    const deduction = mistakeCount + repeatedCount;
    const finalScore = Math.max(baseScore - deduction, 0);

    const assessment = await createAssessment({
      studentClassesId,
      frequency,
      page,
      type,
      pageCount,
      score: finalScore,
      note,
    });

    return assessment;
  } catch (error: any) {
    console.error(error);
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: error.message || "Internal Server Error",
      })
    );
  }
});
