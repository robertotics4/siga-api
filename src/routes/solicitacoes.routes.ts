import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import buscarSolicitacoesController from '../modules/solicitacoes/useCases/buscarSolicitacoes';

const solicitacoesRotas = Router();

solicitacoesRotas.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      empresaOperadora: Joi.number().required().min(11).max(99),
      contaContrato: Joi.string()
        .required()
        .pattern(new RegExp(/^[0-9.]+$/))
        .max(12),
      codigoNota: Joi.string()
        .pattern(new RegExp(/^[0-9.]+$/))
        .max(12),
      telefone: Joi.string()
        .pattern(new RegExp(/^[0-9.]+$/))
        .min(10)
        .max(11),
    },
  }),
  async (request, response) => {
    return buscarSolicitacoesController.handle(request, response);
  },
);

export default solicitacoesRotas;
