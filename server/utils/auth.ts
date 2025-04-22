import { H3Event, createError } from 'h3';
import { Role } from '@prisma/client';
import jwt from "jsonwebtoken";



export function authorize(event: H3Event, allowed: Role[]) {
  const user = event.context.user;
  if (!user || !allowed.includes(user.type)) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' });
  }
}


export function authorizeOrOwner(event: H3Event, allowed: Role[], ownerId: string) {
    const user = event.context.user;
    if (!user) {
      throw createError({ statusCode: 403, statusMessage: 'Forbidden' });
    }
    // jika role di dalam allowed, langsung lanjut
    if (allowed.includes(user.type)) {
      return;
    }
    // cek ownership untuk STUDENT dan PARENT
    if (user.type === Role.STUDENT && user.student?.id === ownerId) {
      return;
    }
    if (user.type === Role.PARENT && user.parent?.id === ownerId) {
      return;
    }
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' });
  }
  

  export interface UserPayload {
    id: string;
    email: string;
    type: "ADMIN" | "TEACHER" | "STUDENT" | "PARENT";
  }
  
  export async function getUserFromEvent(event: H3Event): Promise<UserPayload> {
    const auth = getHeader(event, "authorization");
    if (!auth || !auth.startsWith("Bearer "))
      throw createError({ statusCode: 401, message: "Missing token" });
  
    const token = auth.split(" ")[1];
    try {
      const secret = process.env.JWT_SECRET!;
      const user = jwt.verify(token, secret) as UserPayload;
      return user;
    } catch {
      throw createError({ statusCode: 401, message: "Invalid token" });
    }
  }