import { defineEventHandler, readBody } from "h3";
import { createDivision } from "../../../db/division";
import type { Field } from "@prisma/client";

export default defineEventHandler(async (event) => {
  try {
    const { name } = await readBody(event) as { name: Field };
    const division = await createDivision(name);
    return { message: "Division created successfully", division };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
});
