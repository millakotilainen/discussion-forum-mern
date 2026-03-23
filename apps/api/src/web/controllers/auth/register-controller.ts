import type { Request, Response, NextFunction } from "express";
import { RegisterRequestSchema } from "@forum/shared";
import { RegisterUser } from "src/application/use-cases/register-user";
import mongoUserRepository from "src/infrastructure/repositories/mongo-user-repository";
import mockPasswordHasher from "src/infrastructure/dev/mock-password-hasher";

const registerUser = new RegisterUser(mongoUserRepository, mockPasswordHasher);

export async function registerController(req: Request, res: Response, next: NextFunction) {
  try {
    // Validate and parse the request body
    const data = RegisterRequestSchema.parse(req.body);

    // Call busineess logic to register the user
    const result = await registerUser.execute(data);

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}