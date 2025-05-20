import { defineEventHandler, readBody, sendError, createError } from "h3";
import { updateAchievement } from "../../../db/achievements";

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id;

    if (!id || typeof id !== "string") {
      throw new Error("Missing or invalid id parameter.");
    }

    const { title, description, certificateImage, certificatePdf } = await readBody(event);

    const updatedData: Record<string, any> = {};
    if (title !== undefined) updatedData.title = title;
    if (description !== undefined) updatedData.description = description;
    if (certificateImage !== undefined) updatedData.certificateImage = certificateImage;
    if (certificatePdf !== undefined) updatedData.certificatePdf = certificatePdf;

    const achievement = await updateAchievement(id, updatedData);

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
