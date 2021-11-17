import { Request, Response } from 'express';
import { container } from 'tsyringe';

import BuscarSolicitacoesUseCase from './BuscarSolicitacoesUseCase';

class BuscarSolicitacoesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const empresaOperadora = Number(request.query.empresaOperadora);
    const contaContrato = request.query.contaContrato as string;
    const codigoNota = request.query.codigoNota as string;
    const telefone = request.query.telefone as string;

    const buscarSolicitacoesUseCase = container.resolve(
      BuscarSolicitacoesUseCase,
    );

    const solicitacoes = await buscarSolicitacoesUseCase.execute({
      empresaOperadora,
      contaContrato,
      codigoNota,
      telefone,
    });

    return response.json(solicitacoes);
  }
}

export default BuscarSolicitacoesController;
