import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import EnviarLinkSigaController from '../modules/mensagens/useCases/EnviarLinkSiga/EnviarLinkSigaController';

const mensagensRotas = Router();

const enviarLinkSigaController = new EnviarLinkSigaController();

mensagensRotas.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      empresaOperadora: Joi.number().required().valid(82, 86, 95, 98),
      contaContrato: Joi.string()
        .required()
        .pattern(new RegExp(/^[0-9.]+$/))
        .max(12),
      codigoNota: Joi.string()
        .pattern(new RegExp(/^[0-9.]+$/))
        .max(12),
      tipoSolicitacao: Joi.string().required(),
      link: Joi.string().required(),
      tipoMensagem: Joi.string()
        .valid('INICIAR', 'CONCLUIR', 'CANCELAR')
        .insensitive()
        .required(),
    },
  }),
  enviarLinkSigaController.handle,
);

export default mensagensRotas;
