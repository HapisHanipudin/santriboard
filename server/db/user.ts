import { prisma } from ".";

import bcrypt from "bcrypt";

export const createUser = async (data: any) => {
  const finalData = {
    ...data,
    password: bcrypt.hashSync(data.password, 10),
  };

  return await prisma.users.create({
    data: finalData,
  });
};

export const getUsers = async () => {
  return await prisma.users.findMany();
};

export const getUserByUsername = async (username: string) => {
  return await prisma.users.findUnique({
    where: {
      username,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.users.findUnique({
    where: {
      email,
    },
  });
};

export const updateUser = async (id: string, data: any) => {
  return await prisma.users.update({
    where: {
      id,
    },
    data,
  });
};

export const getUserById = (id: string) => {
  return prisma.users.findUnique({ where: { id } });
};
