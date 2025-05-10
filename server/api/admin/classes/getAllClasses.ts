import { defineEventHandler } from 'h3';
import { getAllClasses } from '../../../db/classes';

export default defineEventHandler(async () => {
  return await getAllClasses();
});
