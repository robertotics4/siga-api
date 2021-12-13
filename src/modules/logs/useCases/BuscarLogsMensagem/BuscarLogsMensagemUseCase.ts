import { inject, injectable } from 'tsyringe';

import IBuscarLogsMensagemDTO from '../../dtos/IBuscarLogsMensagemDTO';
import LogItem from '../../entities/LogItem';
import ILogsMensagensRepository from '../../repositories/ILogsMensagensRepository';

@injectable()
class BuscarLogsMensagemUseCase {
  constructor(
    @inject('LogsMensagensRepository')
    private logsMensagensRepository: ILogsMensagensRepository,
  ) {}

  async execute({
    empresaOperadora,
    contaContrato,
    telefone,
  }: IBuscarLogsMensagemDTO): Promise<LogItem[]> {
    const logItens = await this.logsMensagensRepository.buscarLogsMensagem({
      empresaOperadora,
      contaContrato,
      telefone,
    });

    return logItens;
  }
}

export default BuscarLogsMensagemUseCase;
