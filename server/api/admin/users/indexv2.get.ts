import { defineEventHandler, getQuery, sendError } from 'h3';
import { Role } from '@prisma/client';
import { getUsersv2 } from '~/server/db/users';

export default defineEventHandler(async (event) => {
  try {
    // Extract query param `type`, e.g. ?type=ADMIN
    const query = getQuery(event);
    const typeParam = Array.isArray(query.type) ? query.type[0] : query.type;

    let roleFilter: Role | undefined;
    if (typeParam) {
      // Validate against Role enum
      if (!Object.values(Role).includes(typeParam as Role)) {
        return sendError(
          event,
          createError({ statusCode: 400, statusMessage: 'Invalid role type' })
        );
      }
      roleFilter = typeParam as Role;
    }

    const users = await getUsersv2(roleFilter);
    return { data: users };
  } catch (err) {
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: (err as Error).message })
    );
  }
});
