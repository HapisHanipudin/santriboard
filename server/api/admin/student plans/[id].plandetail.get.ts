// server/api/plans/[planId]/details/index.get.ts
import { defineEventHandler, getRouterParam } from 'h3';
import { getPlanDetails } from '../../../db/plans';

export default defineEventHandler(async (event) => {
  const planId = getRouterParam(event, 'planId');
  if (!planId) return { error: 'planId is required' };

  const details = await getPlanDetails(planId);
  return { data: details };
});
