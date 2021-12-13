import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import BuscarLogMensagemController from '../modules/logs/useCases/BuscarLogsMensagem/BuscarLogsMensagemController';
import GravarLogMensagemController from '../modules/logs/useCases/GravarLogMensagem/GravarLogMensagemController';

const logsRotas = Router();

const gravarLogMensagemController = new GravarLogMensagemController();
const buscarLogMensagemController = new BuscarLogMensagemController();

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
      dataEnvio: Joi.alternatives()
        .try(
          Joi.string().regex(
            /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
          ),
          Joi.string().regex(
            /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})$/,
          ),
        )
        .messages({
          'string.pattern.base': 'dataEnvio inválida (ex: DD/MM/YYYY HH:MI:SS)',
        }),
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
      dataNota: Joi.alternatives()
        .try(
          Joi.string().regex(
            /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
          ),
          Joi.string().regex(
            /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})$/,
          ),
        )
        .messages({
          'string.pattern.base': 'dataNota inválida (ex: DD/MM/YYYY HH:MI:SS)',
        }),
    },
  }),
  gravarLogMensagemController.handle,
);

logsRotas.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      empresaOperadora: Joi.number().required().valid(82, 86, 95, 98),
      contaContrato: Joi.string()
        .required()
        .pattern(new RegExp(/^[0-9.]+$/))
        .max(12),
      telefone: Joi.string()
        .required()
        .pattern(new RegExp(/^[0-9.]+$/))
        .min(10)
        .max(11),
    },
  }),
  buscarLogMensagemController.handle,
);

export default logsRotas;
