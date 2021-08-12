import { errors } from 'celebrate';
import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';

import AppError from './errors/AppError';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);
app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.get('/', (request, response) => {
  return response.json({
    apiName: 'Clara Solicitações e Mensagens',
    version: '1.0.0',
  });
});

app.listen(process.env.API_PORT, () => {
  console.log(`Servidor iniciado na porta ${process.env.API_PORT} 🚀`);
});
