import { defineEventHandler, readBody } from 'h3';
import { assignTeacherToClass } from '../../../db/assignTeacherToClass';

export default defineEventHandler(async (event) => {
  try {
    const { classId, teacherId, semesterId } = await readBody(event);

    if (!classId || !teacherId || !semesterId) {
      throw new Error('classId, teacherId, and semesterId are required');
    }

    const result = await assignTeacherToClass(classId, teacherId, semesterId);

    return {
      success: true,
      message: 'Teacher assigned to class successfully',
      data: result,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Unknown error',
    };
  }
});
