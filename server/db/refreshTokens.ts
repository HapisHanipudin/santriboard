
import { prisma } from ".";

// Fungsi untuk membuat refresh token baru
export const createRefreshToken = async (data: any) => {
  return await prisma.refreshToken.create({
    data,
  });
};

// Fungsi untuk mendapatkan refresh token berdasarkan token yang diberikan
export const getRefreshTokenByToken = async (token: string) => {
  return await prisma.refreshToken.findUnique({
    where: {
      token,
    },
  });
};

// Fungsi untuk menghapus refresh token dari database
export const removeRefreshToken = async (token: string) => {
  return await prisma.refreshToken.delete({
    where: {
      token,
    },
  });
};
