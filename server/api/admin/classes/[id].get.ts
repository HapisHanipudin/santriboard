import { defineEventHandler } from 'h3';
import { getClassById } from '../../../db/classes';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) {
    event.res.statusCode = 400;
    return { error: 'Missing ID' };
  }
  return await getClassById(id);
});
