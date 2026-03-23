import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { registerRoutes } from './web/routes';
import { errorHandler } from './web/middleware/error-handler';
import { requestLogger } from './web/middleware/request-logger';
import { connectToDatabase } from './infrastructure/database/mongo-client';

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

registerRoutes(app);
app.use(errorHandler);

const port = Number(process.env.PORT ?? 3001);

async function startServer() {
  await connectToDatabase();

  app.listen(port, () => {
    console.log(JSON.stringify({ msg: 'api_started', port }));
  });
}

startServer().catch((err) => {
  console.error(JSON.stringify({ msg: 'api_start_failed', error: err instanceof Error ? err.message : String(err) }));
  process.exit(1);
});