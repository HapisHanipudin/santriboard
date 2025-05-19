import { defineEventHandler } from 'h3';
import { deleteassessment } from '../../../../db/assessment';

export default defineEventHandler(async (event) => {
  const idParam = event.context.params?.id;

  if (!idParam || typeof idParam !== 'string') {
    event.res.statusCode = 400;
    return { error: "Valid id is required" };
  }

  // Konversi id dari string ke number
  const id = Number(idParam);
  if (isNaN(id)) {
    event.res.statusCode = 400;
    return { error: "Id must be a number" };
  }

  try {
    const deleted = await deleteassessment(id);
    return { success: true, data: deleted };
  } catch (err) {
    event.res.statusCode = 500;
    return { error: "Failed to delete assessment", detail: err };
  }
});
