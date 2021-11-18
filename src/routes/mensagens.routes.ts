import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import EnviarLinkSigaController from '../modules/mensagens/useCases/EnviarLinkSiga/EnviarLinkSigaController';
import persistirMensagemLogController from '../modules/mensagens/useCases/PersistirMensagemLog';

const mensagensRotas = Router();

const enviarLinkSigaController = new EnviarLinkSigaController();

mensagensRotas.post(
  '/',
  celebrate({
    [Segments.QUERY]: {
      empresaOperadora: Joi.number().required().valid(82, 86, 95, 98),
    },
    [Segments.BODY]: {
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
  (request, response) => {
    return persistirMensagemLogController.handle(request, response);
  },
);

mensagensRotas.post('/enviar-link', enviarLinkSigaController.handle);

export default mensagensRotas;
