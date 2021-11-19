import { inject, injectable } from 'tsyringe';

import IGravarLogMensagemDTO from '../../dtos/IGravarLogMensagemDTO';
import ILogsMensagensRepository from '../../repositories/ILogsMensagensRepository';

@injectable()
class GravarLogMensagemUseCase {
  constructor(
    @inject('LogsMensagensRepository')
    private logsMensagensRepository: ILogsMensagensRepository,
  ) {}

  async execute(data: IGravarLogMensagemDTO): Promise<void> {
    await this.logsMensagensRepository.gravarLogMensagem(data);
  }
}

export default GravarLogMensagemUseCase;
