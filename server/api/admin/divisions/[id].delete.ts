import { defineEventHandler } from "h3";
import { deleteDivision } from "../../../db/division";

export default defineEventHandler(async (event) => {
  try {
    const params = event.context.params;

    if (!params || !params.id) {
      return {
        statusCode: 400,
        statusMessage: "Missing division ID in route parameters",
      };
    }

    const id = params.id as string;
    await deleteDivision(id);

    return { message: "Division deleted successfully" };
  } catch (error) {
    return {
      statusCode: 500,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
});
