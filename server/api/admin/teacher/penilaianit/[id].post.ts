import { createAssessment } from '../../../../db/assessment';
import type { AssessmentType, Frequency } from '@prisma/client';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const {
      studentClassesId,
      type,
      frequency,
      score,
      note,
      itTopic,
    } = body;

    if (!studentClassesId || !type || !frequency || score === undefined) {
      return sendError(
        event,
        createError({ statusCode: 400, statusMessage: 'Missing required fields' })
      );
    }

    const validTypes = Object.values(AssessmentType);
    const validFrequencies = Object.values(Frequency);

    if (!validTypes.includes(type)) {
      return sendError(
        event,
        createError({ statusCode: 400, statusMessage: 'Invalid assessment type' })
      );
    }

    if (!validFrequencies.includes(frequency)) {
      return sendError(
        event,
        createError({ statusCode: 400, statusMessage: 'Invalid frequency' })
      );
    }

    // BATASI HANYA UNTUK TYPE IT
    if (type !== AssessmentType.IT) {
      return sendError(
        event,
        createError({ statusCode: 403, statusMessage: 'Assessment create hanya untuk type IT' })
      );
    }

    const newAssessment = await createAssessment({
      studentClassesId,
      type,
      frequency,
      score,
      note,
      itTopic,
    });

    return newAssessment;
  } catch (error) {
    console.error('Create assessment error:', error);
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: 'Internal server error' })
    );
  }
});
