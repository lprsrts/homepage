import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-this-in-production";

export interface TokenPayload {
  username: string;
  iat?: number;
  exp?: number;
}

export function signToken(payload: { username: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}

export async function verifyAuth(request: Request): Promise<{
  authenticated: boolean;
  user?: TokenPayload;
}> {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { authenticated: false };
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);

    if (!payload) {
      return { authenticated: false };
    }

    return { authenticated: true, user: payload };
  } catch (error) {
    return { authenticated: false };
  }
}
