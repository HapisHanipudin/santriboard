import { defineEventHandler, sendError, createError } from "h3";
import { getAllPlanDetails } from "../../../db/planDetails";

export default defineEventHandler(async (event) => {
  try {
    return await getAllPlanDetails();
  } catch (error: any) {
    console.error(error);
    return sendError(event, createError({ statusCode: 500, statusMessage: error.message }));
  }
});
