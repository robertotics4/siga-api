import express from 'express';
import 'dotenv/config';

import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', (request, response) => {
  return response.json({
    apiName: 'Clara Solicitações e Mensagens',
    version: '1.0.0',
  });
});

app.listen(process.env.API_PORT, () => {
  console.log(`Servidor iniciado na porta ${process.env.API_PORT} 🚀`);
});
