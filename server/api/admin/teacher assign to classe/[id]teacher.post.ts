import { defineEventHandler } from 'h3';
import { assignTeacherToClass } from '../../../db/assignTeacherToClass';


export default defineEventHandler(async (event) => {
    const { classId } = event.context.params!;
    const { teacherId, semesterId } = await readBody(event);
    try {
      if (!teacherId || !semesterId) {
        throw new Error('teacherId and semesterId are required');
      }
      return await assignTeacherToClass(classId, teacherId, semesterId);
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  });