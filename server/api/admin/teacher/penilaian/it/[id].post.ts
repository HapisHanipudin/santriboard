import { defineEventHandler, readBody } from "h3";
import { createAssessment } from "../../../../../db/assessment";
import { AssessmentType, Frequency } from "@prisma/client";
import { prisma } from "~/server/db";

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as {
    studentClassesId: string;
    type: string;
    frequency: string;
    note?: string;
    itTopic?: string;
    completion?: number; // persentase string, contoh "10%"
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

  // Validasi dan parsing completion ke angka
  if (!body.completion) {
    return {
      statusCode: 400,
      message: "completion is required",
    };
  }

  // Score diambil dari completionInt, bisa diubah sesuai kebutuhan
  const finalScore = body.completion;

  

  try {
    const assessment = await prisma.assessment.create({
        data: {
          studentClassesId: body.studentClassesId,
          type: AssessmentType.IT,
          frequency: body.frequency as Frequency,
          score: finalScore,
          note: body.note || "",
          detail: {
            create: {
              itTopic: body.itTopic,
              completion: body.completion,
            }
          }
        },
        include: {
          detail: true,
        }
      });
      

    return {
      statusCode: 200,
      message: `Assessment IT berhasil dibuat. Skor: ${finalScore}`,
      data: {
        id: assessment.id,
        studentClassesId: assessment.studentClassesId,
        type: assessment.type,
        frequency: assessment.frequency,
        score: assessment.score,
        note: assessment.note,
        detail: {
          id: assessment.detail?.id ?? null,
          itTopic: assessment.detail?.itTopic ?? null,
          completion: assessment.detail?.completion ?? null,
        },
      },
    };
  } catch (error: any) {
    console.error("Error creating IT assessment:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message,
    };
  }
});
