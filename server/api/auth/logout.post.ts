import { getCookie, deleteCookie, sendError } from "h3";
import { removeRefreshToken } from "~/server/db/refreshTokens";
import { hashToken } from "~/server/utils/hash";

export default defineEventHandler(async (event: any) => {
  try {
    // Ambil refresh token dari cookie
    const refreshToken = getCookie(event, "refresh_token");

    if (!refreshToken) {
      return sendError(event, createError({
        statusCode: 400,
        statusMessage: "No refresh token found"
      }));
    }

    // Hash refresh token sebelum disimpan atau dihapus
    const hashedToken = hashToken(refreshToken);

    // Hapus refresh token dari DB berdasarkan hashed token
    await removeRefreshToken(hashedToken);

    // Hapus refresh token di cookie client
    deleteCookie(event, "refresh_token");

    return {
      message: "Logged out successfully",
    };
  } catch (error) {
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: "Logout failed",
    }));
  }
});
