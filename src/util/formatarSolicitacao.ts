import Solicitacao from '../modules/solicitacoes/entities/Solicitacao';
import { ISolicitacaoResponse } from '../modules/solicitacoes/useCases/buscarSolicitacoes/BuscarSolicitacoesUseCase';
import verificarSessaoAtiva from './verificarSessaoAtiva';

function formatarSolicitacao(solicitacao: ISolicitacaoResponse): Solicitacao {
  if (!solicitacao) {
    return null;
  }

  const novaSolicitacao = {
    dataSolicitacao: solicitacao.DATA_SOLICITACAO,
    idConversa: solicitacao.ID_CONVERSA,
    sessao: solicitacao.SESSAO,
    empresa: solicitacao.EMPRESA,
    contaContrato: solicitacao.CONTA_CONTRATO,
    telefone: solicitacao.TELEFONE,
    telefoneComNove: solicitacao.TELEFONE_9,
    codigoServico: solicitacao.CODIGO_SR,
    codigoNota: solicitacao.CODIGO_NOTA,
    canal: solicitacao.CANAL,
    regional: solicitacao.REGIONAL,
    municipio: solicitacao.MUNICIPIO,
    tipoSolicitacao: solicitacao.TIPO_SOLICITACAO,
    totalSolicitacoes: solicitacao.TOTAL_SOLICITACOES,
    sessaoAtiva: verificarSessaoAtiva(solicitacao.DATA_SOLICITACAO),
  };

  return novaSolicitacao;
}

export default formatarSolicitacao;
