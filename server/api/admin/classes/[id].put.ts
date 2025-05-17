import { defineEventHandler, readBody, createError } from 'h3';
import { updateClass } from '../../../db/classes';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing ID' });
  }

  const body = await readBody(event);

  try {
    const updated = await updateClass(id, body);
    return {
      success: true,
      message: 'Class updated',
      data: updated,
    };
  } catch (error: any) {
    // Bisa juga log error di sini jika perlu
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to update class',
    });
  }
});
