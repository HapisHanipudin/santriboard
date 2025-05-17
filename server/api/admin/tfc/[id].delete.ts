import { defineEventHandler } from 'h3';
import { removeTeacherFromClassById } from '../../../db/assignTeacherToClass';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  
  try {
    if (!id) {
      throw new Error('id is required from route parameter');
    }
    await removeTeacherFromClassById(id);
    return { success: true, message: 'Teacher-Class assignment removed' };
  } catch (error: any) {
    return { success: false, error: error.message || 'Unknown error' };
  }
});
