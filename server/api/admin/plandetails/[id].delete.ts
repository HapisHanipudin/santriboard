import { defineEventHandler, sendError, createError } from "h3";
import { deletePlanDetails } from "../../../db/planDetails";

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id;
    if (!id) throw new Error("Missing ID");

    await deletePlanDetails(id);
    return { success: true };
  } catch (error: any) {
    console.error(error);
    return sendError(event, createError({ statusCode: 500, statusMessage: error.message }));
  }
});
