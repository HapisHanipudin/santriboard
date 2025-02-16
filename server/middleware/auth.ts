import UrlPattern from "url-pattern";
import { decodeAccessToken } from "../utils/jwt";
import { sendError } from "h3";
import { getUserById } from "../db/users";
import { userTransformer } from "../transformers/user";

interface Endpoint {
  method: string;
  endpoint: string;
}

export default defineEventHandler(async (event: any) => {
  const endpoints: Endpoint[] = [];

  const isHandled = endpoints.some(({ method, endpoint }) => {
    const pattern = new UrlPattern(endpoint);

    // Cek apakah URL dan metode HTTP sesuai
    return pattern.match(event.node.req.url) && event.node.req.method === method;
  });

  if (!isHandled) {
    return;
  }

  const token = event.node.req.headers["authorization"]?.split(" ")[1];

  const decoded = decodeAccessToken(token);

  if (!decoded) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      })
    );
  }
  try {
    const user = await getUserById(decoded.userId);
    event.context.auth = userTransformer(user);
  } catch (error) {
    return;
  }
});
