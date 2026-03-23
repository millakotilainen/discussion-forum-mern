import type { Express } from 'express';
import { healthController } from './controllers/health-controller';
import authRouter from './routes/auth-routes';
import { requireAuth } from './middleware/require-auth';


export function registerRoutes(app: Express) {
  app.get('/health', healthController);

  app.use('/auth', authRouter);

  app.get('/me', requireAuth, (req, res) => {
    res.json({ user: req.user });
  });
}