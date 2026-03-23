import e from "express";
import type { JwtPayload } from "./infrastructure/security/jwt-token-service";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}   

export {};