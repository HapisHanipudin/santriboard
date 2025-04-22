import { defineEventHandler, getRouterParam } from "h3";
import { removeTeacherFromDivision } from "../../../db/teacherDivision";

export default defineEventHandler(async (event) => {
  try {
    const divisionId = getRouterParam(event, "divisionId")!;
    const teacherId = getRouterParam(event, "teacherId")!;

    await removeTeacherFromDivision(divisionId, teacherId);

    return {
      message: "Teacher removed from division successfully",
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
});
