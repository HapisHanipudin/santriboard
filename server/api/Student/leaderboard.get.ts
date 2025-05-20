import { defineEventHandler, getQuery } from 'h3'
import { prisma } from '@/server/db'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const divisionId = query.divisionId as string | undefined

  if (!divisionId) {
    return { error: 'Missing divisionId in query params' }
  }

  const classes = await prisma.classes.findMany({
    where: { divisionId },
    include: {
      students: {
        include: {
          student: true,
          scores: true,
          assesment: true
        }
      }
    }
  })

  const leaderboard: Record<string, { id: string, nis: string, name: string, totalScore: number }> = {}

  for (const cls of classes) {
    for (const sc of cls.students) {
      const student = sc.student
      const scoreSum = sc.scores.reduce((sum, s) => sum + s.value, 0)
      const assessmentSum = sc.assesment.reduce((sum, a) => sum + a.score, 0)
      const total = scoreSum + assessmentSum

      if (!leaderboard[student.id]) {
        leaderboard[student.id] = {
          id: student.id,
          nis: student.nis ?? '',
          name: student.name,
          totalScore: total
        }
      } else {
        leaderboard[student.id].totalScore += total
      }
    }
  }

  return Object.values(leaderboard).sort((a, b) => b.totalScore - a.totalScore)
})
