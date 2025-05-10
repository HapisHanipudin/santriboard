import { defineEventHandler } from 'h3';
import { getSemesters } from '../../../db/semester';

export default defineEventHandler(async () => {
  const semesters = await getSemesters();
  return { data: semesters };
});
