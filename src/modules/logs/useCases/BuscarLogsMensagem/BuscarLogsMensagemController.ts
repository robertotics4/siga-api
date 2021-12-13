import { Request, Response } from 'express';
import { container } from 'tsyringe';

import BuscarLogsMensagemUseCase from './BuscarLogsMensagemUseCase';

class BuscarLogsMensagemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const empresaOperadora = Number(request.query.empresaOperadora);
    const contaContrato = request.query.contaContrato as string;
    const telefone = request.query.telefone as string;

    const buscarLogsMensagemUseCase = container.resolve(
      BuscarLogsMensagemUseCase,
    );

    const logItens = await buscarLogsMensagemUseCase.execute({
      empresaOperadora,
      contaContrato,
      telefone,
    });

    return response.status(200).json(logItens);
  }
}

export default BuscarLogsMensagemController;
