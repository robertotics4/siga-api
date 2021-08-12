import { Router } from 'express';

import buscarSolicitacoesController from '../modules/solicitacoes/useCases/buscarSolicitacoes';

const solicitacoesRotas = Router();

solicitacoesRotas.get('/', async (request, response) => {
  return buscarSolicitacoesController.handle(request, response);
});

export default solicitacoesRotas;
