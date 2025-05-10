import { defineEventHandler, getRouterParam, readBody } from 'h3';
import { createPlan } from '../../../db/plans';

export default defineEventHandler(async (event) => {
  const studentId = getRouterParam(event, 'studentId');
  const body = await readBody(event);

  if (!studentId || !body?.title) return { error: 'Missing fields' };

  const plan = await createPlan(studentId, body.title);
  return { data: plan };
});
