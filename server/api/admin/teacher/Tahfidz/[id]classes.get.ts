import { defineEventHandler, getQuery } from "h3";
import { getClassesByTeacher } from "../../../../db/classes";

export default defineEventHandler(async (event) => {
  const { teacherId, semesterId } = getQuery(event) as {
    teacherId?: string;
    semesterId?: string;
  };

  if (!teacherId || !semesterId) {
    event.res.statusCode = 400;
    return { error: "Missing teacherId or semesterId" };
  }

  return await getClassesByTeacher(teacherId, semesterId);
});
