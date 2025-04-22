import { defineEventHandler, getRouterParam, readBody } from "h3";
import { assignGradeToStudent } from "../../../db/grades";

export default defineEventHandler(async (event) => {
  const studentId = getRouterParam(event, "studentId")!;
  const semesterId = getRouterParam(event, "semesterId")!;
  const body = await readBody(event);
  const { gradeId } = body;

  const result = await assignGradeToStudent(studentId, semesterId, gradeId);

  return {
    message: "Grade assigned to student successfully",
    result,
  };
});