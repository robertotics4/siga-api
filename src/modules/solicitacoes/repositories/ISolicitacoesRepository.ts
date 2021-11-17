import IBuscarSolicitacaoDTO from '../dtos/IBuscarSolicitacaoDTO';
import Solicitacao from '../entities/Solicitacao';

interface ISolicitacoesRepository {
  buscarSolicitacoes({
    empresaOperadora,
    contaContrato,
    codigoNota,
    telefone,
  }: IBuscarSolicitacaoDTO): Promise<Solicitacao[]>;
}

export default ISolicitacoesRepository;
