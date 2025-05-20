import { getTeacherClasses } from "../../../db/teacher";
import { createError, getRouterParams, getQuery, defineEventHandler } from "h3"; // pastikan ini sudah diimport sesuai framework kamu

export default defineEventHandler(async (event) => {
  const user = event.context.auth;
  // console.log(user.teacher);
  const query = getQuery(event);

  const teacherId = user.teacher.id;
  const divisionName = query.category as Field | undefined;

  if (!teacherId) {
    throw createError({
      statusCode: 400,
      statusMessage: "teacherId is required",
    });
  }

  try {
    const classes = await getTeacherClasses(teacherId, divisionName);
    console.log(classes);
    return {
      success: true,
      data: classes,
    };
  } catch (error) {
    console.error(error); // menampilkan error di console
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
