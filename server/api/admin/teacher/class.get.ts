import { getTeacherClasses } from "../../../db/teacher";
import { Role, TeacherRole, Users } from "@prisma/client";
import { createError, getRouterParams, getQuery, defineEventHandler } from "h3"; // pastikan ini sudah diimport sesuai framework kamu
import { getDivisionById, getDivisions } from "~/server/db/division";

export default defineEventHandler(async (event) => {
  const user = event.context.auth;
  // console.log(user.teacher);
  const query = getQuery(event);

  const teacher = user.teacher;
  const divisionId = query.kategori as string | undefined;

  console.log("divisionId", divisionId);

  if (divisionId) {
    const division = await getDivisionById(divisionId);
    if (!division) {
      throw createError({
        statusCode: 404,
        statusMessage: "Category was not found",
      });
    }
  }

  if (!teacher.id) {
    throw createError({
      statusCode: 400,
      statusMessage: "teacherId is required",
    });
  }

  try {
    const classes = await getTeacherClasses(teacher.id, divisionId, user?.type as Role);
    // console.log(classes);
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
