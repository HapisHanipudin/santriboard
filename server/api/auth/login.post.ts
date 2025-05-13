import { getUserByUsername } from "~/server/db/users";
import { sendError, setCookie } from "h3";
import bcrypt from "bcrypt";
import { generateTokens, sendRefreshToken } from "~/server/utils/jwt";
import { userTransformer } from "~/server/transformers/user";
import { createRefreshToken } from "~/server/db/refreshTokens";
import { hashToken } from "../../utils/hash"; // buat helper baru

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;

  if (!username || !password) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalid Params" })
    );
  }

  const user = await getUserByUsername(username);
  if (!user) {
    return sendError(
      event,
      createError({ statusCode: 404, statusMessage: "User Not Found" })
    );
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return sendError(
      event,
      createError({ statusCode: 401, statusMessage: "Invalid Password" })
    );
  }

  // 🔐 Generate access + refresh token
  const { accessToken, refreshToken } = generateTokens(user);

  // 🔐 Simpan hash refresh token
  const hashedToken = hashToken(refreshToken);
  await createRefreshToken({
    tokenHash: hashedToken,
    userId: user.id,
  });

  // 🍪 Kirim refresh token via httpOnly cookie
  sendRefreshToken(event, refreshToken);

  // ✅ Kirim access token dan user info
  return {
    access_token: accessToken,
    user: userTransformer(user),
  };
});
