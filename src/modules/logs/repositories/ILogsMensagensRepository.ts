import IBuscarLogsMensagemDTO from '../dtos/IBuscarLogsMensagemDTO';
import IGravarLogMensagemDTO from '../dtos/IGravarLogMensagemDTO';
import LogItem from '../entities/LogItem';

interface ILogsMensagensRepository {
  gravarLogMensagem(data: IGravarLogMensagemDTO): Promise<void>;
  buscarLogsMensagem({
    empresaOperadora,
    contaContrato,
    telefone,
  }: IBuscarLogsMensagemDTO): Promise<LogItem[]>;
}

export default ILogsMensagensRepository;
