import jwt, { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";
import { setCookie, H3Event, getHeader, createError } from "h3";

// Tambahan interface untuk payload token
interface JwtPayload extends DefaultJwtPayload {
  userId: string;
}

// Tipe untuk user
interface User {
  id: string;
}

const config = useRuntimeConfig();

if (!config.jwtAccessSecret || !config.jwtRefreshSecret) {
  throw new Error("JWT secrets are not defined in runtimeConfig");
}


export async function getCurrentUserId(event: H3Event): Promise<string> {
  const auth = getHeader(event, "authorization") || "";
  const token = auth.replace(/^Bearer\s+/, "");
  if (!token) throw createError({ statusCode: 401, statusMessage: "Unauthorized" });

  try {
    const config = useRuntimeConfig();
const payload = jwt.verify(token, config.jwtAccessSecret) as JwtPayload;
    return payload.userId;
  } catch (e) {
    throw createError({ statusCode: 401, statusMessage: "Invalid token" });
  }
}

const generateAccessToken = (user: User): string => {
  const config = useRuntimeConfig();
/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Generates a refresh token for the given user.
 *
 * @param {object} user
 * @return {string}
 */
/*******  e1ad264d-4d1b-45e3-ab3a-e968453e6a60  *******/  return jwt.sign({ userId: user.id }, config.jwtAccessSecret, {
    expiresIn: "1d",
  });
};

const generateRefreshToken = (user: User): string => {
  const config = useRuntimeConfig();
  return jwt.sign({ userId: user.id }, config.jwtRefreshSecret, {
    expiresIn: "14d",
  });
};

export const generateTokens = (user: User): { accessToken: string; refreshToken: string } => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    accessToken,
    refreshToken,
  };
};

export const decodeAccessToken = (token: string): JwtPayload | null => {
  try {
    const config = useRuntimeConfig();
    return jwt.verify(token, config.jwtAccessSecret) as JwtPayload;
  } catch {
    return null;
  }
};

export const decodeRefreshToken = (token: string): JwtPayload | null => {
  try {
    const config = useRuntimeConfig();
    return jwt.verify(token, config.jwtRefreshSecret) as JwtPayload;
  } catch {
    return null;
  }
};

export const sendRefreshToken = (event: H3Event, refreshToken: string): void => {
  setCookie(event, "refresh_token", refreshToken, {
    httpOnly: true,
    // sameSite: "strict",
    // secure: process.env.NODE_ENV === "production",
    // path: "/auth/refresh",
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14 hari dalam milidetik
  });
};
