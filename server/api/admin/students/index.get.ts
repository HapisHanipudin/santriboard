import { defineEventHandler } from "h3";
import { getAllStudents } from "~/server/db/student";
import { authorize } from "../../../utils/auth";
import { Role } from "@prisma/client";

export default defineEventHandler(async (event) => {
  try {
    authorize(event, [Role.ADMIN, Role.TEACHER]);

    const students = await getAllStudents();
    return {
      message: "Students fetched successfully",
      students,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
});
