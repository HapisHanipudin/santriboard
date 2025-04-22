import { Role } from "@prisma/client";
import { prisma } from "../db";

import bcrypt from "bcrypt";


export async function getUserByIdV2(id: string) {
  return prisma.users.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      username: true,
      type: true,
      createdAt: true,
      updatedAt: true,
    }
  });
}

export async function getUsersv2(role?: Role) {
  const where = role ? { type: role } : {};
  return prisma.users.findMany({
    where,
    select: {
      id: true,
      email: true,
      username: true,
      type: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}

export interface UpdateUserPayload { 
  username?: string; 
  password?: string;
  email?: string;

  type?: Role;
}

export async function updateUserById(
  id: string,
  data: UpdateUserPayload
) {
  const updateData: Partial<UpdateUserPayload> = {};

  if (data.username) updateData.username = data.username;
  if (data.email) updateData.email = data.email;
  if (data.type) updateData.type = data.type; // Pastikan ini adalah nilai enum

  if (data.password) {
    const hash = await bcrypt.hash(data.password, 10);
    updateData.password = hash;
  }

  return prisma.users.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      email: true,
      username: true,
      type: true,
      updatedAt: true,
    }
  });
}


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
    include: {
      teacher: true,
      student: true,
      parent: true,
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

export const getUserByIdV1 = (id: string) => {
  return prisma.users.findUnique({ where: { id } });
};
