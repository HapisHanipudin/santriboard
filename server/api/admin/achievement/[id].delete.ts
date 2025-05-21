import { defineEventHandler, sendError, createError } from "h3";
import { deleteAchievement } from "../../../db/achievements";

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id;

    if (!id) {
      throw new Error("Missing id parameter.");
    }

    await deleteAchievement(id);

    return { message: "Achievement deleted successfully." };
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
