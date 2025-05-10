import { defineEventHandler, readBody } from "h3";
import { createDailyassessment } from "../../../../db/assessment";
import { Division } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const { studentId, teacherId, mistakes = 0 } = await readBody(event);
  if (!studentId || !teacherId) {
    event.res.statusCode = 400;
    return { error: "studentId and teacherId are required" };
  }

  // Calculate score: 100 minus mistakes, min 0
  let score = Math.max(0, 100 - mistakes);
  const record = await createDailyassessment(studentId, teacherId, Division.TAHFIZH, score, mistakes > 0 ? `Mistakes: ${mistakes}` : undefined);
  return record;
});
