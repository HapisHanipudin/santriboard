import { defineEventHandler, readBody, sendError, createError } from "h3";
import { updatePlanDetails } from "../../../db/planDetails";
import { PlanType } from "@prisma/client";

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id;
    const { type, content } = await readBody(event);

    if (!id || (!type && !content)) {
      throw new Error("Missing ID or update data.");
    }

    let data: any = {};
    if (type) {
      if (!Object.values(PlanType).includes(type)) {
        throw new Error("Invalid value for 'type'.");
      }
      data.type = type as PlanType;
    }

    if (content) {
      data.content = content;
    }

    const updated = await updatePlanDetails(id, data);
    return updated;
  } catch (error: any) {
    console.error(error);
    return sendError(event, createError({ statusCode: 400, statusMessage: error.message }));
  }
});
