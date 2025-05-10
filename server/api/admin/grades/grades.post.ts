import { defineEventHandler, readBody } from "h3";
import { createGrade } from "../../../db/grades";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { grade, type } = body;

  const newGrade = await createGrade(grade, type);

  return {
    message: "Grade created successfully",
    grade: newGrade,
  };
});
