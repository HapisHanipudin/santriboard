import { defineEventHandler, readBody, sendError, createError } from "h3";
import { createPlanDetails } from "../../../db/planDetails";
import { PlanType } from "@prisma/client";

export default defineEventHandler(async (event) => {
  try {
    const { planId, type, content } = await readBody(event);

    if (!planId || !type || !content) {
      throw new Error("Missing required fields: planId, type, content.");
    }

    if (!Object.values(PlanType).includes(type)) {
      throw new Error(`Invalid value for 'type'. Allowed values: ${Object.values(PlanType).join(", ")}`);
    }

    const detail = await createPlanDetails({
      planId,
      type: type as PlanType,
      content,
    });

    return detail;
  } catch (error: any) {
    console.error(error);
    return sendError(event, createError({ statusCode: 500, statusMessage: error.message }));
  }
});
