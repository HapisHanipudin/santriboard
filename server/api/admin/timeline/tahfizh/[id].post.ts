import { defineEventHandler, readBody } from "h3";
import { prisma } from "~/server/db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = event.context.user;

  if (!user || user.role !== "TEACHER") {
    return { statusCode: 403, message: "Unauthorized" };
  }

  const isKadivTahfizh = await prisma.teacherDivisions.findFirst({
    where: {
      teacherId: user.teacherId,
      role: "KADIV",
      division: { name: "TAHFIZH" }
    },
    include: { division: true }
  });

  if (!isKadivTahfizh) {
    return { statusCode: 403, message: "Only KADIV Tahfizh allowed" };
  }

  // Validasi body
  if (!body.studentClassesId || !body.date || !body.activityType || body.targetPage == null) {
    return { statusCode: 400, message: "Missing required fields" };
  }

  const allowedTypes = ["SABAK", "SABQI", "MANZIL", "UJIAN"];
  if (!allowedTypes.includes(body.activityType)) {
    return { statusCode: 400, message: "Invalid activity type" };
  }

  const date = new Date(body.date);
  if (isNaN(date.getTime())) {
    return { statusCode: 400, message: "Invalid date format" };
  }

  // Simpan
  const timeline = await prisma.timelineActivities.create({
    data: {
      studentClassesId: body.studentClassesId,
      date,
      activityType: body.activityType,
      targetPage: body.targetPage,
    }
  });

  return {
    statusCode: 200,
    message: "Timeline target created",
    data: timeline
  };
});
