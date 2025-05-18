import { defineEventHandler, getQuery } from "h3";
import { getClassesByTeacher } from "../../../../db/classes";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const teacherId = query.teacherId as string | undefined;
  const semesterId = query.semesterId as string | undefined;

  if (!teacherId || !semesterId) {
    event.res.statusCode = 400;
    return { error: "Missing teacherId or semesterId" };
  }

  return await getClassesByTeacher(teacherId, semesterId);
});
