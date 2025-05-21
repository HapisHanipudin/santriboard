import { defineEventHandler, sendError, createError } from "h3";
import { deleteNote } from "../../../db/notes";

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id;
    if (!id) throw new Error("Missing ID.");

    const deleted = await deleteNote(id);
    return deleted;
  } catch (error: any) {
    console.error(error);
    return sendError(event, createError({ statusCode: 500, statusMessage: error.message }));
  }
});
