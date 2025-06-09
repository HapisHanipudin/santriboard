import { defineEventHandler, readBody } from "h3";
import { createClass } from "~/server/db/classes";
import { assignStudentsToClass } from "~/server/db/studentClasses"; // Assuming these functions exist
import { getLatestSemester } from "~/server/db/semester";
import { assignTeacherToClass } from "~/server/db/teacherClasses";

export default defineEventHandler(async (event) => {
  const { students }: { students: string[] } = await readBody(event);

  const classId = getRouterParam(event, "id") as string;
  const semester = (await getLatestSemester()) as any;

  if (students && Array.isArray(students)) {
    const studentsClasses = await assignStudentsToClass({ classId, students, semesterId: semester.id });
    return { message: "Students assigned successfully", data: studentsClasses };
  } else {
    event.node.res.statusCode = 400;
    return { error: "Invalid students data" };
  }
});
