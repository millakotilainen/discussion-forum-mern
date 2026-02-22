import type { NextFunction, Request, Response } from 'express';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  console.error(JSON.stringify({ msg: 'unhandled_error', err }));
  res.status(500).json({ error: 'InternalServerError' });
}