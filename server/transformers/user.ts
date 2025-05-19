import { type Role } from "@prisma/client";

interface BaseUser {
  id: number | string;
  username: string;
  email: string;
  type: Role;
  teacher?: { name: string };
  student?: { name: string };
  parent?: { name: string };
}

interface TransformedUser {
  id: string;
  username: string;
  email: string;
  role: Role;
  handle: string;
}

export const userTransformer = (user: any): TransformedUser => {
  const finalUser: TransformedUser = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.type,
    handle: "@" + user.username,
  };

  return finalUser;
};
