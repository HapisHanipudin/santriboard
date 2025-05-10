import { defineEventHandler, readBody, getRouterParam } from "h3";
import { assignTeacherToDivision } from "../../../db/teacherDivision";

export default defineEventHandler(async (event) => {
  try {
    const divisionId = getRouterParam(event, "divisionId")!;
    const body = await readBody(event);
    const { teacherId, role } = body; // role: optional (default: ASATIDZ)

    const result = await assignTeacherToDivision(divisionId, teacherId, role);

    return {
      message: "Teacher assigned to division successfully",
      data: result,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
});
