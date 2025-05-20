import { defineEventHandler, readBody, sendError, createError } from 'h3';
import { createFamily, FamilyCreateInput } from '../../../db/families';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<FamilyCreateInput>(event);
    const newFamily = await createFamily(body);
    return { message: 'Family created successfully', data: newFamily };
  } catch (error: any) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: error.message || 'Terjadi kesalahan saat membuat keluarga.',
      })
    );
  }
});
