// server/api/assessment/[id].delete.ts
import { defineEventHandler } from 'h3';
import { deleteassessment } from '../../../../db/assessment';

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id);

  if (!id) {
    event.res.statusCode = 400;
    return { error: "id is required" };
  }

  try {
    const deleted = await deleteassessment(id);
    return { success: true, data: deleted };
  } catch (err) {
    event.res.statusCode = 500;
    return { error: "Failed to delete assessment", detail: err };
  }
});
