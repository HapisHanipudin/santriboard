import { defineEventHandler, getQuery, sendError, createError } from "h3";
import { getScoreSummary, getAssessments } from "../../../../db/assessment";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const id = query.id as string | undefined;

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing 'id' in query parameters",
      });
    }

    const [assessments, summary] = await Promise.all([getAssessments(id), getScoreSummary(id)]);

    return { assessments, summary };
  } catch (error: any) {
    console.error(error);
    return sendError(
      event,
      createError({
        statusCode: error.statusCode || 500,
        statusMessage: error.statusMessage || "Internal Server Error",
        data: { message: error.message },
      })
    );
  }
});
