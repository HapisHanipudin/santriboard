import { defineEventHandler } from 'h3';
import { getFamilyById } from '../../../db/families';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id as string;
  const family = await getFamilyById(id);
  return { data: family };
});