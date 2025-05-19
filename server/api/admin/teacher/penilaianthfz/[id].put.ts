import { defineEventHandler, readBody } from 'h3'
import { updateAssessment } from '../../../../db/assessment'
import { AssessmentType } from '@prisma/client'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    if (!body.id || typeof body.id !== 'number') {
      return { statusCode: 400, message: 'Assessment ID is required and must be a number' }
    }

    // Ambil dan validasi data minimal
    const updated = await updateAssessment(body.id, {
      frequency: body.frequency,
      score: body.score,
      note: body.note,
      page: body.page,
      pageCount: body.pageCount,
    })

    // Pastikan hanya assessment TAHFIZH yang boleh diupdate di route ini
    if (updated.type !== AssessmentType.TAHFIZH) {
      return {
        statusCode: 400,
        message: 'Only TAHFIZH assessments can be updated via this route',
      }
    }

    return {
      statusCode: 200,
      message: 'Tahfizh assessment updated successfully',
      data: updated,
    }
  } catch (error: any) {
    console.error('Update error:', error)
    return { statusCode: 500, message: 'Failed to update assessment', error: error.message }
  }
})
