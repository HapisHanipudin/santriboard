import { defineEventHandler } from 'h3';
import { deleteClass } from '../../../db/classes';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  if (!id) {
    event.res.statusCode = 400;
    return { error: 'Missing ID' };
  }

  await deleteClass(id);
  return { message: 'Class deleted successfully' };
});
