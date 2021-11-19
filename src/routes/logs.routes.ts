import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import GravarLogMensagemController from '../modules/logs/useCases/GravarLogMensagem/GravarLogMensagemController';

const logsRotas = Router();

const gravarLogMensagemController = new GravarLogMensagemController();

logsRotas.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      empresaOperadora: Joi.number().required().valid(82, 86, 95, 98),
      canal: Joi.string().required(),
      sessao: Joi.string(),
      telefone: Joi.string()
        .required()
        .pattern(new RegExp(/^[0-9.]+$/))
        .min(10)
        .max(11),
      dataEnvio: Joi.string(),
      idEnvio: Joi.string(),
      mensagemEnviada: Joi.string(),
      tipoSolicitacao: Joi.string().required(),
      codigoServico: Joi.string(),
      codigoNota: Joi.string()
        .pattern(new RegExp(/^[0-9.]+$/))
        .max(12),
      contaContrato: Joi.string()
        .required()
        .pattern(new RegExp(/^[0-9.]+$/))
        .max(12),
      status: Joi.string(),
      categoria: Joi.string()
        .required()
        .valid('PUSH', 'PUSH - ATIVO', 'SERVICO', 'SERVICO - ATIVO'),
      usuario: Joi.string(),
      dataNota: Joi.string(),
    },
  }),
  gravarLogMensagemController.handle,
);

export default logsRotas;