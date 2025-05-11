import { defineEventHandler } from 'h3';
import { getDivisions } from '~/server/db/division';

export default defineEventHandler(async () => {
  try {
    return await getDivisions();
  } catch (err) {
    return { statusCode: 500, error: (err as Error).message };
  }
});
