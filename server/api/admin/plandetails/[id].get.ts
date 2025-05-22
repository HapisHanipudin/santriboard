import { defineEventHandler, sendError, createError } from "h3";
import { getPlanDetailsById } from "../../../db/planDetails";

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id;
    if (!id) throw new Error("Missing ID parameter");

    const detail = await getPlanDetailsById(id);
    if (!detail) throw new Error("PlanDetails not found");

    return detail;
  } catch (error: any) {
    console.error(error);
    return sendError(event, createError({ statusCode: 404, statusMessage: error.message }));
  }
});
