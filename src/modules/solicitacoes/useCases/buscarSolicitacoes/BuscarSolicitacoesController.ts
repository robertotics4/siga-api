import { Request, Response } from 'express';

import BuscarSolicitacoesUseCase from './BuscarSolicitacoesUseCase';

class BuscarSolicitacoesController {
  constructor(private buscarSolicitacoesUseCase: BuscarSolicitacoesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const empresaOperadora = Number(request.query.empresaOperadora);
      const contaContrato = request.query.contaContrato as string;
      const codigoNota = request.query.codigoNota as string;
      const telefone = request.query.telefone as string;

      const solicitacoes = await this.buscarSolicitacoesUseCase.execute({
        empresaOperadora,
        contaContrato,
        codigoNota,
        telefone,
      });

      if (!solicitacoes.length) {
        return response
          .status(204)
          .json({ message: 'A conta contrato não possui solicitações' });
      }

      return response.json(solicitacoes);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }
}

export default BuscarSolicitacoesController;
