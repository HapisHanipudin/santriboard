import { defineEventHandler, readBody } from 'h3';
import { createFamily, FamilyCreateInput } from '../../../db/families';

export default defineEventHandler(async (event) => {
  const body = await readBody<FamilyCreateInput>(event);
  const newFamily = await createFamily(body);
  return { message: 'Family created successfully', data: newFamily };
});