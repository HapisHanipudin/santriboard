import { defineEventHandler, sendError, createError } from "h3";
import { getNoteById } from "../../../db/notes";

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id;
    if (!id) throw new Error("Missing ID.");

    const note = await getNoteById(id);
    if (!note) throw new Error("Note not found.");

    return note;
  } catch (error: any) {
    console.error(error);
    return sendError(event, createError({ statusCode: 404, statusMessage: error.message }));
  }
});
