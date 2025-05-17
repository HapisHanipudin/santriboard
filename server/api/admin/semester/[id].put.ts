import { defineEventHandler, getQuery, readBody } from 'h3';
import { updateSemester } from '../../../db/semester';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const payload = await readBody<Partial<{ semester: number; period: string }>>(event);
  const updated = await updateSemester(String(id), payload);
  return { data: updated };
});
