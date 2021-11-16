import { Request, Response } from 'express';
import { container } from 'tsyringe';

import BuscarClienteAPIUseCase from './BuscarClienteAPIUseCase';

class BuscarClienteAPIController {
  async handle(request: Request, response: Response): Promise<Response> {
    const empresaOperadora = Number(request.query.empresaOperadora) as number;
    const contaContrato = request.query.contaContrato as string;

    const buscarClienteAPIUseCase = container.resolve(BuscarClienteAPIUseCase);

    const cliente = await buscarClienteAPIUseCase.execute({
      empresaOperadora,
      contaContrato,
    });

    return response.json(cliente);
  }
}

export default BuscarClienteAPIController;
