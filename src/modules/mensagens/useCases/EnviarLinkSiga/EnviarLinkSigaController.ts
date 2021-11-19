import { Request, Response } from 'express';
import { container } from 'tsyringe';

import EnviarLinkSigaUseCase from './EnviarLinkSigaUseCase';

class EnviarLinkSigaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { empresaOperadora, contaContrato, codigoNota, link } = request.body;

    const enviarLinkSigaUseCase = container.resolve(EnviarLinkSigaUseCase);

    await enviarLinkSigaUseCase.execute({
      empresaOperadora: Number(empresaOperadora),
      contaContrato,
      codigoNota,
      link,
    });

    return response.status(201).send();
  }
}

export default EnviarLinkSigaController;
