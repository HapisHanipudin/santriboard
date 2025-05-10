import { defineEventHandler, readBody } from "h3";
import { updateDivision } from "../../../db/division";
import type { Field } from "@prisma/client";

export default defineEventHandler(async (event) => {
  try {
    const params = event.context.params;

    if (!params || !params.id) {
      return {
        statusCode: 400,
        statusMessage: "Missing division ID in route parameters",
      };
    }

    const { name } = await readBody(event) as { name: Field };

    const division = await updateDivision(params.id as string, name);

    return {
      message: "Division updated successfully",
      division,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
});
