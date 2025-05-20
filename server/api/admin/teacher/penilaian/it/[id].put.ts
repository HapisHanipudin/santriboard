import { defineEventHandler, readBody, getRouterParams } from "h3";
import { prisma } from "~/server/db";
import { AssessmentType, Frequency } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  if (!id) {
    return {
      statusCode: 400,
      message: "Assessment ID is required",
    };
  }

  const body = (await readBody(event)) as {
    studentClassesId: string;
    type: string;
    frequency: string;
    note?: string;
    itTopic?: string;
    completion?: number;
  };

  if (body.type !== AssessmentType.IT) {
    return {
      statusCode: 400,
      message: "Assessment type must be IT",
    };
  }

  if (!body.studentClassesId || !body.frequency) {
    return {
      statusCode: 400,
      message: "studentClassesId and frequency are required",
    };
  }

  if (typeof body.completion !== "number") {
    return {
      statusCode: 400,
      message: "completion must be a number",
    };
  }

  const existing = await prisma.assessment.findUnique({
    where: { id: Number(id) },
    include: { detail: true },
  });

  if (!existing) {
    return {
      statusCode: 404,
      message: "Assessment not found",
    };
  }

  if (existing.type !== AssessmentType.IT) {
    return {
      statusCode: 400,
      message: "Only IT assessment can be updated via this endpoint",
    };
  }

  try {
    const updated = await prisma.assessment.update({
      where: { id: Number(id) },
      data: {
        studentClassesId: body.studentClassesId,
        frequency: body.frequency as Frequency,
        score: body.completion,
        note: body.note || "",
        detail: {
          update: {
            itTopic: body.itTopic,
            completion: body.completion,
          },
        },
      },
      include: { detail: true },
    });

    return {
      statusCode: 200,
      message: "Assessment IT berhasil diupdate",
      data: {
        id: updated.id,
        studentClassesId: updated.studentClassesId,
        type: updated.type,
        frequency: updated.frequency,
        score: updated.score,
        note: updated.note,
        detail: {
          id: updated.detail?.id ?? null,
          itTopic: updated.detail?.itTopic ?? null,
          completion: updated.detail?.completion ?? null,
        },
      },
    };
  } catch (error: any) {
    console.error("Error updating IT assessment:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message,
    };
  }
});
