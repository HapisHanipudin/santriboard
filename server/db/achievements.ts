import { prisma } from '.';

export async function createAchievement(data: {
  title: string;
  description: string;
  studentId: string;
  certificateImage?: string;
  certificatePdf?: string;
}) {
  return prisma.achievements.create({
    data,
  });
}

export async function getAllAchievements() {
  return prisma.achievements.findMany({
    include: {
      student: true,
    },
  });
}

export async function getAchievementById(id: string) {
  return prisma.achievements.findUnique({
    where: { id },
    include: { student: true },
  });
}

export async function updateAchievement(id: string, data: {
  title?: string;
  description?: string;
  certificateImage?: string;
  certificatePdf?: string;
}) {
  return prisma.achievements.update({
    where: { id },
    data,
  });
}

export async function deleteAchievement(id: string) {
  return prisma.achievements.delete({
    where: { id },
  });
}