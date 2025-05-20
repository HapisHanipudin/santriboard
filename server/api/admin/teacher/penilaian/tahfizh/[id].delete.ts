import { defineEventHandler, getRouterParam } from 'h3'
import { deleteAssessment } from '~/server/db/assessment'
import { prisma } from '~/server/db'

export default defineEventHandler(async (event) => {
  const idParam = getRouterParam(event, 'id')

  if (!idParam || isNaN(Number(idParam))) {
    return {
      statusCode: 400,
      message: 'Invalid or missing assessment ID',
    }
  }

  const id = Number(idParam)

  try {
    // Pastikan assessment adalah tipe TAHFIZH
    const existing = await prisma.assessment.findUnique({ where: { id } })

    if (!existing) {
      return {
        statusCode: 404,
        message: `Assessment with id ${id} not found`,
      }
    }

    if (existing.type !== 'TAHFIZH') {
      return {
        statusCode: 403,
        message: 'Only TAHFIZH assessments can be deleted from this endpoint',
      }
    }

    await deleteAssessment(id)

    return {
      statusCode: 200,
      message: `Assessment TAHFIZH dengan id ${id} berhasil dihapus.`,
    }
  } catch (error: any) {
    console.error('Error deleting TAHFIZH assessment:', error)
    return {
      statusCode: 500,
      message: 'Internal Server Error',
      error: error.message,
    }
  }
})
