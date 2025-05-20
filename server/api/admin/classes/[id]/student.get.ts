import { defineEventHandler, getQuery } from "h3";
import { getClassWithDetailsById } from "../../../../db/classes";
import { filterClassData, ClassRaw } from "../../../../utils/filterClassData";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  if (!id) {
    event.res.statusCode = 400;
    return { error: "Valid class id is required" };
  }

  try {
    const classData = await getClassWithDetailsById(id);

    if (!classData) {
      event.res.statusCode = 404;
      return { error: "Class not found" };
    }

    // Cast ke ClassRaw supaya TypeScript paham
    const classRaw = classData as ClassRaw;

    const filteredData = filterClassData(classRaw, {
      showDivisionId: true,
      showTeacherIds: true,
      showStudentIds: true,
    });

    return filteredData;
  } catch (err) {
    event.res.statusCode = 500;
    return { error: "Failed to fetch class data", detail: err };
  }
});
