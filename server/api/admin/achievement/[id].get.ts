import { defineEventHandler, sendError, createError } from "h3";
import { getAchievementById } from "../../../db/achievements";

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id;

    if (!id || typeof id !== "string") {
      throw new Error("Missing or invalid id parameter.");
    }

    const achievement = await getAchievementById(id);

    if (!achievement) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: "Achievement not found.",
        })
      );
    }

    return achievement;
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
