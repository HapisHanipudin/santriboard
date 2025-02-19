import { prisma } from ".";

export const getLeaderboardByDivision = async (plp: string) => {
  return await prisma.divisions.findMany({
    where: {
      id: plp,
    },
    include: {
      classes: {
        include: {
          teachers: {
            include: {
              teacher: true,
            },
          },
          students: {
            include: {
              evaluations: true,
              student: true,
            },
          },
        },
      },
    },
  });
};
