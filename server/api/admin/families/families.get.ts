import { defineEventHandler } from 'h3';
import { getAllFamilies } from '../../../db/families';

export default defineEventHandler(async () => {
  const families = await getAllFamilies();
  return { data: families };
});