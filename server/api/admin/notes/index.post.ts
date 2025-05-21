import { defineEventHandler, readBody, sendError, createError } from "h3";
import { createNote } from "../../../db/notes";

export default defineEventHandler(async (event) => {
  try {
    const { studentId, teacherId, note } = await readBody(event);

    if (!studentId || !teacherId) {
      throw new Error("Missing required fields: studentId and teacherId");
    }

    const created = await createNote({ studentId, teacherId, note });
    return created;
  } catch (error: any) {
    console.error(error);
    return sendError(event, createError({ statusCode: 500, statusMessage: error.message }));
  }
});
