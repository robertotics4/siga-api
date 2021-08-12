import { Request, Response } from 'express';

import BuscarSolicitacoesUseCase from './BuscarSolicitacoesUseCase';

class BuscarSolicitacoesController {
  constructor(private buscarSolicitacoesUseCase: BuscarSolicitacoesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { empresaOperadora, contaContrato, codigoNota } = request.query;

      const solicitacoes = await this.buscarSolicitacoesUseCase.execute({
        empresaOperadora: Number(empresaOperadora),
        contaContrato: contaContrato.toString(),
        codigoNota: codigoNota.toString(),
      });

      return response.json(solicitacoes);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }
}

export default BuscarSolicitacoesController;
