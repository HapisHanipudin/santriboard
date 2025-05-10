import { defineEventHandler, getRouterParam } from "h3";

import { deleteStudent } from "../../../db/student";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    if (!id) throw new Error("ID not provided");

    const deleted = await deleteStudent(id);
    return {
      message: "Student deleted successfully",
      deleted,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
});
