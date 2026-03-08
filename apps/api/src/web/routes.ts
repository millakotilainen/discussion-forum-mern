import type { Express } from 'express';
import { healthController } from './controllers/health-controller';
import authRouter from './routes/auth-routes';


export function registerRoutes(app: Express) {
  app.get('/health', healthController);

  app.use('/auth', authRouter);
}