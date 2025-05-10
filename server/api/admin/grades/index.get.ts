import { defineEventHandler } from "h3";
import { getAllGrades } from "../../../db/grades";

export default defineEventHandler(async () => {
  const grades = await getAllGrades();
  return grades;
});
