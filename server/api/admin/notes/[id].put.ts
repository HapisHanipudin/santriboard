import { defineEventHandler, readBody, sendError, createError } from "h3";
import { updateNote } from "../../../db/notes";

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id;
    if (!id) throw new Error("Missing ID.");

    const { note } = await readBody(event);

    const updated = await updateNote(id, { note });
    return updated;
  } catch (error: any) {
    console.error(error);
    return sendError(event, createError({ statusCode: 500, statusMessage: error.message }));
  }
});
