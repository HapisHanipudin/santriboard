import { defineEventHandler, getQuery } from "h3";
import { prisma } from "@/server/db";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const divisionId = query.kategori as string | undefined;

  const students = await prisma.students.findMany({
    where: divisionId
      ? {
          classes: {
            some: {
              class: {
                divisionId,
              },
            },
          },
        }
      : undefined,
    include: {
      classes: {
        where: divisionId ? { class: { divisionId: divisionId } } : undefined,
        include: {
          class: true,
          scores: true,
          assesment: true,
        },
      },
    },
  });

  const result = students.map((student) => {
    const studentClasses = student.classes;
    if (!studentClasses || studentClasses.length === 0) {
      return {
        studentId: student.id,
        name: student.name,
        averageScore: 0,
      };
    }

    const totalScoresPerClass = studentClasses.map((sc) => {
      const totalScoreValue = sc.scores.reduce(
        (acc, score) => acc + score.value,
        0
      );
      const totalAssessmentScore = sc.assesment.reduce(
        (acc, assess) => acc + assess.score,
        0
      );
      return totalScoreValue + totalAssessmentScore;
    });

    const classCount = studentClasses.length;
    const totalScoreAllClasses = totalScoresPerClass.reduce(
      (acc, val) => acc + val,
      0
    );
    const averageScore = totalScoreAllClasses / classCount;

    return {
      studentId: student.id,
      name: student.name,
      averageScore,
    };
  });

  return result;
});
