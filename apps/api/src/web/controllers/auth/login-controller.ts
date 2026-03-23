import type { Request, Response, NextFunction } from "express";
import { LoginRequestSchema } from "@forum/shared";
import { LoginUser } from "src/application/use-cases/login-user";
import mongoUserRepository from "src/infrastructure/repositories/mongo-user-repository";
import bcryptPasswordVerifier from "src/infrastructure/security/bcrypt-password-verifier";

const loginUser = new LoginUser(mongoUserRepository, bcryptPasswordVerifier);

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