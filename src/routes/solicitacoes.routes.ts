import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import BuscarSolicitacoesController from '../modules/solicitacoes/useCases/buscarSolicitacoes/BuscarSolicitacoesController';

const solicitacoesRotas = Router();

const buscarSolicitacoesController = new BuscarSolicitacoesController();

solicitacoesRotas.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      empresaOperadora: Joi.number().required().valid(82, 86, 95, 98),
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
  buscarSolicitacoesController.handle,
);

export default solicitacoesRotas;
