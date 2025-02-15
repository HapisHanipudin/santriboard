import jwt from "jsonwebtoken";
import { setCookie } from "h3";

const generateAccessToken = (user) => {
  const config = useRuntimeConfig();
  return jwt.sign({ userId: user.id }, config.jwtAccessSecret, {
    expiresIn: "1d",
  });
};

const generateRefreshToken = (user) => {
  const config = useRuntimeConfig();
  return jwt.sign({ userId: user.id }, config.jwtRefreshSecret, {
    expiresIn: "14d",
  });
};

export const generateTokens = (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    accessToken,
    refreshToken,
  };
};

export const decodeAccessToken = (token) => {
  try {
    const config = useRuntimeConfig();
    return jwt.verify(token, config.jwtAccessSecret);
  } catch (error) {
    return null;
  }
};

export const decodeRefreshToken = (token) => {
  try {
    const config = useRuntimeConfig();
    return jwt.verify(token, config.jwtRefreshSecret);
  } catch (error) {
    return null;
  }
};

export const sendRefreshToken = (event, refreshToken) => {
  setCookie(event, "refresh_token", refreshToken, {
    httpOnly: true, // Cookie hanya bisa diakses oleh server, bukan client-side scripts
    // sameSite: "strict", // Menghindari pengiriman cookie ke domain lain
    // secure: process.env.NODE_ENV === "production", // Cookie hanya dikirim melalui HTTPS jika di production
    // path: "/auth/refresh", // Pastikan token hanya bisa diakses pada endpoint ini
    maxAge: 14 * 24 * 60 * 60 * 1000, // 7 hari dalam milidetik
  });
};
