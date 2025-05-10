import { prisma } from ".";

export const getLeaderboardByDivision = async (plp: string) => {
  return await prisma.divisions.findUnique({
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
