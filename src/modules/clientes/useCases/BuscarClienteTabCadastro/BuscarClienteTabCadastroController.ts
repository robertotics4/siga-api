import { Request, Response } from 'express';

import BuscarClienteTabCadastroUseCase from './BuscarClienteTabCadastroUseCase';

class BuscarClienteTabCadastroController {
  constructor(
    private buscarClienteTabCadastroUseCase: BuscarClienteTabCadastroUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const empresaOperadora = Number(request.query.empresaOperadora) as number;
    const contaContrato = request.query.contaContrato as string;

    const cliente = await this.buscarClienteTabCadastroUseCase.execute({
      empresaOperadora,
      contaContrato,
    });

    return response.json(cliente);
  }
}

export default BuscarClienteTabCadastroController;
