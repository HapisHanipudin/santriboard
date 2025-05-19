import { defineEventHandler, getQuery } from 'h3'
import { getAssessments } from '../../../../db/assessment'
import { AssessmentType, Frequency } from '@prisma/client'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)

    const studentClassesId = query.studentClassesId as string
    const frequency = query.frequency as Frequency | undefined

    if (!studentClassesId) {
      return { statusCode: 400, message: 'studentClassesId is required' }
    }

    const assessments = await getAssessments(studentClassesId, frequency, AssessmentType.TAHFIZH)

    return {
      statusCode: 200,
      message: 'Tahfizh assessments retrieved successfully',
      data: assessments,
    }
  } catch (error: any) {
    console.error('Get error:', error)
    return { statusCode: 500, message: 'Failed to fetch assessments', error: error.message }
  }
})
