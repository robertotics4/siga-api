import { Router } from 'express';

import persistirMensagemLogController from '../modules/mensagens/useCases/PersistirMensagemLog';

const mensagensRotas = Router();

mensagensRotas.post('/', (request, response) => {
  return persistirMensagemLogController.handle(request, response);
});

export default mensagensRotas;
