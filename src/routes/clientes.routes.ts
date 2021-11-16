import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import BuscarClienteTabCadastroController from '../modules/clientes/useCases/BuscarClienteTabCadastro/BuscarClienteTabCadastroController';

const clientesRotas = Router();

const buscarClienteTabCadastroController =
  new BuscarClienteTabCadastroController();

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

export default clientesRotas;
