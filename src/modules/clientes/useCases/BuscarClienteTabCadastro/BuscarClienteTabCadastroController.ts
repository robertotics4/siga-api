import { Request, Response } from 'express';
import { container } from 'tsyringe';

import BuscarClienteTabCadastroUseCase from './BuscarClienteTabCadastroUseCase';

class BuscarClienteTabCadastroController {
  async handle(request: Request, response: Response): Promise<Response> {
    const empresaOperadora = Number(request.query.empresaOperadora) as number;
    const contaContrato = request.query.contaContrato as string;

    const buscarClienteTabCadastroUseCase = container.resolve(
      BuscarClienteTabCadastroUseCase,
    );

    const cliente = await buscarClienteTabCadastroUseCase.execute({
      empresaOperadora,
      contaContrato,
    });

    return response.json(cliente);
  }
}

export default BuscarClienteTabCadastroController;
