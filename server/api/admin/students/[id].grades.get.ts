import { defineEventHandler, getRouterParam } from "h3";
import { getStudentGradesBySemester } from "../../../db/grades";

export default defineEventHandler(async (event) => {
  const studentId = getRouterParam(event, "studentId")!;

  const grades = await getStudentGradesBySemester(studentId);

  return grades;
});
