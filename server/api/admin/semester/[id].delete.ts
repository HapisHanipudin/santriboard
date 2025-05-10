import { defineEventHandler, getQuery } from 'h3';
import { deleteSemester } from '../../../db/semester';

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  await deleteSemester(String(id));
  return { message: 'Semester deleted' };
});
