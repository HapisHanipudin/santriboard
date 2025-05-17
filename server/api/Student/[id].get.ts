// server/api/student/profile/[id].ts
import { defineEventHandler, getRouterParam, createError } from 'h3';
import { getStudents } from '~/server/db/student';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID is required" });
  }

  const student = await getStudents(id);

  if (!student) {
    throw createError({ statusCode: 404, statusMessage: "Student not found" });
  }

  return {
    success: true,
    data: student,
  };
});
