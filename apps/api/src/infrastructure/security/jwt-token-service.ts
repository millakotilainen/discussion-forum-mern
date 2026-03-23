import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

if (!secret) {
    throw new Error("JWT_SECRET environment variable is not set");
}

export default{
    async sign(payload: { userId: string; email: string }): Promise<string> {
        return jwt.sign(payload, secret, { expiresIn: "1h" });
    },
};