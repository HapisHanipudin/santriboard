import { defineEventHandler } from 'h3';
import { updateTeacherClassAssignment } from '../../../db/assignTeacherToClass';

export default defineEventHandler(async (event) => {
    const { classId, teacherId } = event.context.params!;
    const { semesterId } = await readBody(event);
    try {
      if (!semesterId) {
        throw new Error('semesterId is required');
      }
      return await updateTeacherClassAssignment(classId, teacherId, semesterId);
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  });
  