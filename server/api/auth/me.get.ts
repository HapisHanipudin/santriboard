import { defineEventHandler } from 'h3';
import { getCurrentUserId } from '../../utils/jwt';
import { getUserByIdV2 } from '../../db/users';

export default defineEventHandler(async (event) => {
  const userId = await getCurrentUserId(event);
  const user = await getUserByIdV2(userId);
  if (!user) throw createError({ statusCode: 404, statusMessage: 'User not found' });
  return { data: user };
});