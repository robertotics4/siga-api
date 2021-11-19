import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GravarLogMensagemUseCase from './GravarLogMensagemUseCase';

class GravarLogMensagemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
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
    } = request.body;

    const gravarLogMensagemUseCase = container.resolve(
      GravarLogMensagemUseCase,
    );

    await gravarLogMensagemUseCase.execute({
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

    return response.status(201).send();
  }
}

export default GravarLogMensagemController;
