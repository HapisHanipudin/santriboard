import { defineEventHandler, readBody } from "h3";
import { createClass } from "~/server/db/classes";
import { assignStudentsToClass } from "~/server/db/studentClasses"; // Assuming these functions exist
import { getLatestSemester } from "~/server/db/semester";
import { assignTeacherToClass, assignTeachersToClass } from "~/server/db/teacherClasses";

export default defineEventHandler(async (event) => {
  const { teachers }: { teachers: string[] } = await readBody(event);

  const classId = getRouterParam(event, "id") as string;
  const semester = (await getLatestSemester()) as any;

  if (teachers && Array.isArray(teachers)) {
    const teacherClasses = await assignTeachersToClass({ classId, teachers, semesterId: semester.id });
    return { message: "Teachers assigned successfully", data: teacherClasses };
  } else {
    event.res.statusCode = 400;
    return { error: "Invalid teachers data" };
  }
});
