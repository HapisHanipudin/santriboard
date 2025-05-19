import { defineEventHandler, readBody } from 'h3'
import { deleteAssessment } from '../../../../db/assessment'
import { prisma } from '../../../../db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    if (!body.id || typeof body.id !== 'number') {
      return { statusCode: 400, message: 'Assessment ID is required and must be a number' }
    }

    // Validasi dulu apakah assessment ini tipe TAHFIZH
    const existing = await prisma.assessment.findUnique({
      where: { id: body.id },
    })

    if (!existing || existing.type !== 'TAHFIZH') {
      return {
        statusCode: 400,
        message: 'Only TAHFIZH assessments can be deleted via this route',
      }
    }

    const deleted = await deleteAssessment(body.id)

    return {
      statusCode: 200,
      message: 'Tahfizh assessment deleted successfully',
      data: deleted,
    }
  } catch (error: any) {
    console.error('Delete error:', error)
    return { statusCode: 500, message: 'Failed to delete assessment', error: error.message }
  }
})
