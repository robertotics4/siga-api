import { Request, Response } from 'express';

import BuscarSolicitacoesUseCase from './BuscarSolicitacoesUseCase';

class BuscarSolicitacoesController {
  constructor(private buscarSolicitacoesUseCase: BuscarSolicitacoesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const empresaOperadora = request.query.empresaOperadora as string;
      const contaContrato = request.query.contaContrato as string;
      const codigoNota = request.query.codigoNota as string;
      const telefone = request.query.telefone as string;

      const solicitacoes = await this.buscarSolicitacoesUseCase.execute({
        empresaOperadora: Number(empresaOperadora),
        contaContrato,
        codigoNota,
        telefone,
      });

      return response.json(solicitacoes);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }
}

export default BuscarSolicitacoesController;
