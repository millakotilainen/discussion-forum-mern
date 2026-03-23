import jwt from "jsonwebtoken";
import { verify } from "node:crypto";
import { de } from "zod/locales";

const secret = process.env.JWT_SECRET;

if (!secret) {
    throw new Error("JWT_SECRET environment variable is not set");
}

export type JwtPayload = {
    userId: string;
    email: string;
};

const jwtTokenService = {
    async sign(payload: JwtPayload): Promise<string> {
        return jwt.sign(payload, secret, { expiresIn: "1h" });
    },

    async verify(token: string): Promise<JwtPayload> {
        const decoded = jwt.verify(token, secret);
        if (typeof decoded !== "object" || decoded === null || !("userId" in decoded) || !("email" in decoded)  ) {
            throw new Error("Invalid token payload");
        }
        return {
            userId: String(decoded.userId),
            email: String(decoded.email),
        };
    },
};

export default jwtTokenService;