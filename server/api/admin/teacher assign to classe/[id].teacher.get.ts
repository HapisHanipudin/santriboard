import { defineEventHandler } from 'h3';
import { getTeachersByClass } from '../../../db/assignTeacherToClass';

export default defineEventHandler(async (event) => {
  const { classId } = event.context.params!;
  try {
    return await getTeachersByClass(classId);
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
});