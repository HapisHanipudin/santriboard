import { defineEventHandler } from 'h3';
import { createSemester } from '../../../db/semester';

export default defineEventHandler(async (event) => {
    const body = await readBody<{ semester: number; period: string }>(event);
    const created = await createSemester(body);
    return { data: created };
  });