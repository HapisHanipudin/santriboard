import { defineEventHandler } from 'h3';
import { deleteFamily } from '../../../db/families';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id as string;
  await deleteFamily(id);
  return { message: 'Family deleted successfully' };
});
