import { defineEventHandler } from "h3";
import { removeTeacherFromClass } from "../../../db/assignTeacherToClass";

export default defineEventHandler(async (event) => {
  const { classId, teacherId, semesterId } = event.context.params!;
  try {
    await removeTeacherFromClass(classId, teacherId, semesterId);
    return { message: "Teacher removed from class successfully" };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
});
