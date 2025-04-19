import { defineEventHandler, readBody } from "h3";
import { assignStudentToClass } from "../../db/student";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { studentId, classId, semesterId } = body;

    if (!studentId || !classId || !semesterId) {
      return { error: "Missing required fields" };
    }

    const result = await assignStudentToClass(studentId, classId, semesterId);
    return { success: true, data: result };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
});
