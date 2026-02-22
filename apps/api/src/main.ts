import express from 'express';
import cors from 'cors';
import { registerRoutes } from './web/routes';
import { errorHandler } from './web/middleware/error-handler';
import { requestLogger } from './web/middleware/request-logger';

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

registerRoutes(app);

app.use(errorHandler);

const port = Number(process.env.PORT ?? 3001);
app.listen(port, () => {
  console.log(JSON.stringify({ msg: 'api_started', port }));
});