import { defineEventHandler } from 'h3';
import { removeTeacherFromClass } from '../../../db/assignTeacherToClass';

export default defineEventHandler(async (event) => {
    const { classId, teacherId } = event.context.params!;
    try {
      await removeTeacherFromClass(classId, teacherId);
      return { message: 'Teacher removed from class successfully' };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  });