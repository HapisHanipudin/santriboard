import { defineEventHandler, getQuery } from "h3";
import { getStudentRankings } from "../../db/student";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const kategori = typeof query.kategori === "string" ? query.kategori : "";

    const rankings = await getStudentRankings(kategori);

    return rankings;
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
});
