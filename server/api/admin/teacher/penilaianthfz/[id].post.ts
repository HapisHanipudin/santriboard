// server/api/assessment/tahfizh.post.ts

import { defineEventHandler, readBody } from 'h3'
import { createAssessment } from '../../../../db/assessment'
import { AssessmentType, Frequency } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (body.type !== AssessmentType.TAHFIZH) {
    return {
      statusCode: 400,
      message: 'Assessment type must be TAHFIZH',
    }
  }

  if (!body.studentClassesId || !body.frequency) {
    return {
      statusCode: 400,
      message: 'studentClassesId and frequency are required',
    }
  }

  const mistakeCount = typeof body.mistakeCount === 'number' ? body.mistakeCount : 0
  const repeatedCount = typeof body.repeatedCount === 'number' ? body.repeatedCount : 0
  const totalPenalty = mistakeCount + repeatedCount
  const finalScore = Math.max(100 - totalPenalty, 0)

  const autoNote = `Dikurangi ${mistakeCount} karena kesalahan, ${repeatedCount} karena pengulangan`

  try {
    const assessment = await createAssessment({
      studentClassesId: body.studentClassesId,
      type: AssessmentType.TAHFIZH,
      frequency: body.frequency as Frequency,
      score: finalScore,
      note: `${autoNote}${body.note ? ' — ' + body.note : ''}`,
      page: body.page,
      pageCount: body.pageCount,
    })

    return {
      statusCode: 200,
      message: `Assessment berhasil dibuat. Skor akhir: ${finalScore}`,
      data: assessment,
    }
  } catch (error: any) {
    console.error('Error creating tahfizh assessment:', error)
    return {
      statusCode: 500,
      message: 'Internal Server Error',
      error: error.message,
    }
  }
})
