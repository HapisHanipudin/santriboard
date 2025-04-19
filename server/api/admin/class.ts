import { defineEventHandler, readBody } from "h3";
import { createClassWithTeachers } from "../../db/class";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { name, divisionId, semesterId, teachers } = body;

    const newClass = await createClassWithTeachers(name, divisionId, semesterId, teachers);

    return {
      message: "Class and teacher relations created successfully",
      newClass,
    };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
});
