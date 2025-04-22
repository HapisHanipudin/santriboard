import { defineEventHandler, readBody } from 'h3';
import { getCurrentUserId } from '../../utils/jwt';
import { updateUserById } from '../../db/users';

export default defineEventHandler(async (event) => {
  const userId = await getCurrentUserId(event);
  const body = await readBody(event) as { username?: string; password?: string };

  if (!body.username && !body.password) {
    throw createError({ statusCode: 400, statusMessage: 'No fields to update' });
  }

  const updated = await updateUserById(userId, body);
  return { message: 'Profile updated', data: updated };
});