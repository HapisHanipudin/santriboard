import { defineEventHandler } from "h3";
import { getTeachers } from "../../../db/teacher";

export default defineEventHandler(async (_event) => {
  try {
    const teachers = await getTeachers();

    return {
      message: "Teachers fetched successfully",
      teachers,
    };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
});
