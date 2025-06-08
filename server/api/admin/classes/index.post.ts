import { defineEventHandler, readBody } from "h3";
import { createClass } from "../../../db/classes";
import { assignStudentToClass } from "../../../db/studentClasses"; // Assuming these functions exist
import { getLatestSemester } from "~/server/db/semester";
import { assignTeacherToClass } from "~/server/db/teacherClasses";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.name || !body.divisionId) {
    event.res.statusCode = 400;
    return { error: "Missing name or divisionId" };
  }

  const newClass = await createClass(body);

  const semester = (await getLatestSemester()) as any;

  if (body.students && Array.isArray(body.students)) {
    for (const studentId of body.students) {
      await assignStudentToClass(newClass.id, studentId, semester.id);
    }
  }

  if (body.teachers && Array.isArray(body.teachers)) {
    for (const teacherId of body.teachers) {
      await assignTeacherToClass(newClass.id, teacherId, semester.id);
    }
  }

  return { message: "Class created successfully", data: newClass };
});
