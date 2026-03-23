import type { NextFunction, Request, Response } from "express";
import jwtTokenService from "src/infrastructure/security/jwt-token-service";

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const authorization = req.header("Authorization");

        if (!authorization) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const [scheme, token] = authorization.split(" ");

        if (scheme !== "Bearer" || !token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const payload = await jwtTokenService.verify(token);
        req.user = payload;
        return next();
    } catch { 
        return res.status(401).json({ error: "Unauthorized" });
    }
}