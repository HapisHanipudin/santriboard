import { defineEventHandler, readBody, sendError, createError } from "h3";
import { createAchievement } from "../../../db/achievements";

export default defineEventHandler(async (event) => {
  try {
    const { title, description, studentId, certificateImage, certificatePdf } = await readBody(event);

    if (!title || !description || !studentId) {
      throw new Error("Missing required fields: title, description, or studentId.");
    }

    const achievement = await createAchievement({
      title,
      description,
      studentId,
      certificateImage,
      certificatePdf,
    });

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