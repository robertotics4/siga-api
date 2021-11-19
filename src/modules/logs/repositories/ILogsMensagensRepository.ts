import IGravarLogMensagemDTO from '../dtos/IGravarLogMensagemDTO';

interface ILogsMensagensRepository {
  gravarLogMensagem(data: IGravarLogMensagemDTO): Promise<void>;
}

export default ILogsMensagensRepository;
