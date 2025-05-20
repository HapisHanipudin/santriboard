// server/api/leaderboard.get.ts

import { prisma } from '@/server/db'
import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  const { category } = getQuery(event)

  if (category) {
    // Ambil dari division -> classes -> studentClasses -> student
    const division = await prisma.division.findFirst({
      where: { name: String(category) },
      include: {
        classes: {
          include: {
            studentClasses: {
              include: {
                student: {
                  include: {
                    scores: true,
                    assessment: true
                  }
                }
              }
            }
          }
        }
      }
    })

    if (!division) throw createError({ statusCode: 404, message: 'Division not found' })

    const studentMap = new Map<string, {
      id: string
      nis: string
      name: string
      totalScore: number
    }>()

    for (const classItem of division.classes) {
      for (const sc of classItem.studentClasses) {
        const student = sc.student
        const total = (student.scores ?? []).reduce((acc, s) => acc + s.score, 0) +
                      (student.assessment ?? []).reduce((acc, a) => acc + a.score, 0)

        if (!studentMap.has(student.id)) {
          studentMap.set(student.id, {
            id: student.id,
            nis: student.nis,
            name: student.name,
            totalScore: total
          })
        } else {
          studentMap.get(student.id)!.totalScore += total
        }
      }
    }

    const leaderboard = Array.from(studentMap.values()).sort((a, b) => b.totalScore - a.totalScore)
    return leaderboard
  }

  // Tidak ada kategori: dari semua students -> studentClasses -> nilai dirata-ratakan
  const students = await prisma.student.findMany({
    include: {
      studentClasses: {
        include: {
          class: true,
          scores: true,
          assessment: true
        }
      }
    }
  })

  const leaderboard = students.map((student) => {
    let totalScore = 0
    let classCount = student.studentClasses.length

    for (const sc of student.studentClasses) {
      const scoreSum = (sc.scores ?? []).reduce((acc, s) => acc + s.score, 0)
      const assessmentSum = (sc.assessment ?? []).reduce((acc, a) => acc + a.score, 0)
      totalScore += (scoreSum + assessmentSum)
    }

    const averageScore = classCount > 0 ? totalScore / classCount : 0

    return {
      id: student.id,
      nis: student.nis,
      name: student.name,
      averageScore: Math.round(averageScore)
    }
  }).sort((a, b) => b.averageScore - a.averageScore)

  return leaderboard
})
