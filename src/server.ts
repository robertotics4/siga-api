import express from 'express';
import 'dotenv/config';

import knex from './database';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', (request, response) => {
  return response.json({ message: 'Siga API' });
});

app.get('/test', async (request, response) => {
  try {
    const solicitacoes = await knex.raw(
      "SELECT * FROM OWDINCMR.CLARA_SOLICITACOES WHERE CODIGO_SR = '8015571527'",
    );

    return response.json(solicitacoes);
  } catch (err) {
    return response.json({ error: err.message });
  }
});

app.listen(process.env.API_PORT, () => {
  console.log(`Servidor iniciado na porta ${process.env.API_PORT} 🚀`);
});
