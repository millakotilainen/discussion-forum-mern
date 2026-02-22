import type { NextFunction, Request, Response } from 'express';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  res.on('finish', () => {
    console.log(
      JSON.stringify({
        msg: 'http_request',
        method: req.method,
        path: req.path,
        status: res.statusCode,
        ms: Date.now() - start
      }),
    );
  });
  next();
}