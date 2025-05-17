import { defineEventHandler, readBody } from 'h3';
import { updateTeacherClassAssignment } from '../../../db/assignTeacherToClass';

export default defineEventHandler(async (event) => {
  try {
    const { classId, teacherId, semesterId, ...dataToUpdate } = await readBody(event);

    if (!classId || !teacherId || !semesterId) {
      throw new Error('classId, teacherId, and semesterId are required');
    }

    const updated = await updateTeacherClassAssignment(classId, teacherId, semesterId, dataToUpdate);
    return { success: true, data: updated };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
});
