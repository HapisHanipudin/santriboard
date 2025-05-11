// server/api/students/[studentId]/plans/index.get.ts
import { defineEventHandler, getRouterParam } from 'h3';
import { getPlansByStudentId } from '../../../db/plans';

export default defineEventHandler(async (event) => {
  const studentId = getRouterParam(event, 'studentId');
  if (!studentId) return { error: 'studentId is required' };

  const plans = await getPlansByStudentId(studentId);
  return { data: plans };
});
