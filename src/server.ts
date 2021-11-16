import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';

import './shared/container';

import errorHandler from './middlewares/errorHandler';
import routes from './routes';
import swaggerFile from './swagger.json';

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    errorHandler(err, request, response, next);
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
