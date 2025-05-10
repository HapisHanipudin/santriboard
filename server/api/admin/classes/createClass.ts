import { defineEventHandler, readBody } from 'h3';
import { createClass } from '../../../db/classes';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.name || !body.divisionId) {
    event.res.statusCode = 400;
    return { error: 'Missing name or divisionId' };
  }
  const newClass = await createClass(body);
  return { message: 'Class created successfully', data: newClass };
});
