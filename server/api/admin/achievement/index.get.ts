import { defineEventHandler, sendError, createError } from "h3";
import { getAllAchievements } from "../../../db/achievements";

export default defineEventHandler(async (event) => {
  try {
    const achievements = await getAllAchievements();
    return achievements;
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