import { defineEventHandler } from "h3";
import { getAllStudents } from "~/server/db/student";
import { authorize } from "../../../utils/auth";
import { Role } from "@prisma/client";
import { studentBaseTransformer } from "~/server/transformers/student";

export default defineEventHandler(async (event) => {
  try {
    // authorize(event, [Role.ADMIN, Role.TEACHER]);

    const students = await getAllStudents();
    return {
      message: "Students fetched successfully",
      students: students.map(studentBaseTransformer),
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
});
