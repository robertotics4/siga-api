import { Request, Response } from 'express';
import { container } from 'tsyringe';

import EnviarLinkSigaUseCase from './EnviarLinkSigaUseCase';

class EnviarLinkSigaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const empresaOperadora = Number(request.query.empresaOperadora) as number;
    const { contaContrato, codigoNota, link } = request.body;

    const enviarLinkSigaUseCase = container.resolve(EnviarLinkSigaUseCase);

    await enviarLinkSigaUseCase.execute({
      empresaOperadora,
      contaContrato,
      codigoNota,
      link,
    });

    return response.status(204).send();
  }
}

export default EnviarLinkSigaController;
