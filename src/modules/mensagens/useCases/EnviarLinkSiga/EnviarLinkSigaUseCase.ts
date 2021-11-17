import { inject, injectable } from 'tsyringe';

import IMensagensRepository from '../../repositories/IMensagensRepository';

interface IRequest {
  empresaOperadora: number;
  contaContrato: string;
  codigoNota: string;
  link: string;
}

@injectable()
class EnviarLinkSigaUseCase {
  constructor(
    @inject('MensagensRepository')
    private mensagensRepository: IMensagensRepository,
  ) {}

  async execute({
    empresaOperadora,
    contaContrato,
    codigoNota,
    link,
  }: IRequest): Promise<void> {
    // Lógica do caso de uso
  }
}

export default EnviarLinkSigaUseCase;
