
import type { TeacherInput } from '../types/teacher';

const createTeacher = async (teacher: TeacherInput) => {
    try {
      return await $fetch('/api/teacher', {
        method: 'POST',
        body: teacher,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error creating teacher:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
      throw error;
    }
  }; 