import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import BuscarClienteAPIController from '../modules/clientes/useCases/BuscarClienteAPI/BuscarClienteAPIController';
import BuscarClienteTabCadastroController from '../modules/clientes/useCases/BuscarClienteTabCadastro/BuscarClienteTabCadastroController';

const clientesRotas = Router();

const buscarClienteTabCadastroController =
  new BuscarClienteTabCadastroController();

const buscarClienteAPIController = new BuscarClienteAPIController();

clientesRotas.get(
  '/cadastro',
  celebrate({
    [Segments.QUERY]: {
      empresaOperadora: Joi.number().required().valid(82, 86, 95, 98),
      contaContrato: Joi.string()
        .required()
        .pattern(new RegExp(/^[0-9.]+$/))
        .max(12),
    },
  }),
  buscarClienteTabCadastroController.handle,
);

clientesRotas.get(
  '/api',
  celebrate({
    [Segments.QUERY]: {
      empresaOperadora: Joi.number().required().valid(82, 86, 95, 98),
      contaContrato: Joi.string()
        .required()
        .pattern(new RegExp(/^[0-9.]+$/))
        .max(12),
    },
  }),
  buscarClienteAPIController.handle,
);

export default clientesRotas;
