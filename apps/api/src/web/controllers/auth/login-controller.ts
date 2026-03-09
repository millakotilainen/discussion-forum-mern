import type { Request, Response, NextFunction } from "express";
import { LoginRequestSchema } from "@forum/shared";
import { LoginUser } from "src/application/use-cases/login-user";
import inMemoryUserRepository from "src/infrastructure/dev/in-memory-user-repository";
import tempVerifier from "src/infrastructure/dev/mock-password-verifier";

const loginUser = new LoginUser(inMemoryUserRepository, tempVerifier);

export async function loginController(req: Request, res: Response, next: NextFunction){
    try {
        // Validate and parse request body
        const data = LoginRequestSchema.parse(req.body);

        // Call business logic to login user
        const result = await loginUser.execute(data);

        res.status(200).json(result);

    } catch (err) {
        next(err);
    }
}