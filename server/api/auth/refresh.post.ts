import { getUserByIdV1 } from "~/server/db/users";
import { userTransformer } from "~/server/transformers/user";
import { decodeRefreshToken, generateTokens } from "~/server/utils/jwt";
import { hashToken } from "~/server/utils/hash";
import { getRefreshTokenByToken } from "~/server/db/refreshTokens";
import { getCookie, sendError } from "h3";

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, "refresh_token");

  if (!refreshToken) {
    return sendError(event, createError({ statusCode: 401, statusMessage: "Unauthorized" }));
  }

  const decoded = decodeRefreshToken(refreshToken);
  if (!decoded || !decoded.userId) {
    return sendError(event, createError({ statusCode: 401, statusMessage: "Invalid Token" }));
  }

  try {
    const user = await getUserByIdV1(decoded.userId);

    if (!user) {
      return sendError(event, createError({ statusCode: 404, statusMessage: "User Not Found" }));
    }

    const { accessToken } = generateTokens(user);
    return {
      access_token: accessToken,
      user: userTransformer(user),
    };
  } catch (err) {
    return sendError(event, createError({ statusCode: 500, statusMessage: "Something went wrong" }));
  }
});
