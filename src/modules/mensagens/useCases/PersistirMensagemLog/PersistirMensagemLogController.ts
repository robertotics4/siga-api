import { Request, Response } from 'express';

import PersistirMensagemLogUseCase from './PersistirMensagemLogUseCase';

class PersistirMensagemLogController {
  constructor(
    private persistirMensagemLogUseCase: PersistirMensagemLogUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const empresaOperadora = Number(request.query.empresaOperadora) as number;
    const {
      canal,
      sessao,
      telefone,
      dataEnvio,
      idEnvio,
      mensagemEnviada,
      tipoSolicitacao,
      codigoServico,
      codigoNota,
      contaContrato,
      status,
      categoria,
      usuario,
      dataNota,
    } = request.body;

    await this.persistirMensagemLogUseCase.execute({
      empresaOperadora,
      canal,
      sessao,
      telefone,
      dataEnvio,
      idEnvio,
      mensagemEnviada,
      tipoSolicitacao,
      codigoServico,
      codigoNota,
      contaContrato,
      status,
      categoria,
      usuario,
      dataNota,
    });

    return response.status(201).json({ message: 'Log registrado com sucesso' });
  }
}

export default PersistirMensagemLogController;
