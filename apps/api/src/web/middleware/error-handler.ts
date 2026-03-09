import type { NextFunction, Request, Response } from 'express';
import {ZodError} from 'zod';
import { EmailAlreadyInUseError } from 'src/application/use-cases/register-user';
import { InvalidCredentialsError } from 'src/application/use-cases/login-user';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    const fields: Record<string, string> ={};

    for (const issue of err.issues) {
      const key = issue.path.join('.') || 'body';
      if (!fields[key]) fields[key] = issue.message;
    }

    return res.status(400).json({
      error: 'ValidationError',
      fields,
    });
  }
  
  if (err instanceof EmailAlreadyInUseError) {
    return res.status(409).json({
      error: 'EmailAlreadyInUse',
    });
  }

  if (err instanceof InvalidCredentialsError) {
    return res.status(401).json({
      error: 'InvalidCredentials',
    });
  }
  
  console.error(JSON.stringify({ msg: 'unhandled_error', err }));
  res.status(500).json({ error: 'InternalServerError' });
}