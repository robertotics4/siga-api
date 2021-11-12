import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import buscarClienteTabCadastroController from '../modules/clientes/useCases/BuscarClienteTabCadastro';

const clientesRotas = Router();

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
  async (request, response) => {
    return buscarClienteTabCadastroController.handle(request, response);
  },
);

export default clientesRotas;
