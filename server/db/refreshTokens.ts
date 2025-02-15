import { prisma } from ".";

export const createRefreshToken = (data: any) => {
  return prisma.refreshToken.create({
    data,
  });
};

export const getRefreshTokenByToken = (token: string) => {
  return prisma.refreshToken.findUnique({
    where: {
      token,
    },
  });
};

export const removeRefreshToken = (token: string | undefined) => {
  return prisma.refreshToken.delete({
    where: {
      token,
    },
  });
};
