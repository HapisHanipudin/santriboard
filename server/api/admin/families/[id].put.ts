import { defineEventHandler, readBody } from 'h3';
import { updateFamily, FamilyUpdateInput } from '../../../db/families';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id as string;
  const body = await readBody<FamilyUpdateInput>(event);
  const updated = await updateFamily(id, body);
  return { message: 'Family updated successfully', data: updated };
});