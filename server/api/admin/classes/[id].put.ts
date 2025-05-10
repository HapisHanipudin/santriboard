import { defineEventHandler, readBody } from 'h3';
import { updateClass } from '../../../db/classes';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  const body = await readBody(event);

  if (!id) {
    event.res.statusCode = 400;
    return { error: 'Missing ID' };
  }

  const updated = await updateClass(id, body);
  return { message: 'Class updated', data: updated };
});
