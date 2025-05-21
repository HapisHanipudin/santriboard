import { defineEventHandler, sendError, createError } from "h3";
import { getAllNotes } from "../../../db/notes";

export default defineEventHandler(async (event) => {
  try {
    const notes = await getAllNotes();
    return notes;
  } catch (error: any) {
    console.error(error);
    return sendError(event, createError({ statusCode: 500, statusMessage: error.message }));
  }
});
