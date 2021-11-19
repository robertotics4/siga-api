import knex from '../../../../database';
import completarComZeros from '../../../../util/completarComZeros';
import obterOwnerPorCodigoOperadora from '../../../../util/obterOwnerPorCodigoOperadora';
import verificarSessaoAtiva from '../../../../util/verificarSessaoAtiva';
import IBuscarSolicitacaoDTO from '../../dtos/IBuscarSolicitacaoDTO';
import Solicitacao from '../../entities/Solicitacao';
import { ISolicitacaoResponse } from '../../useCases/buscarSolicitacoes/BuscarSolicitacoesUseCase';
import ISolicitacoesRepository from '../ISolicitacoesRepository';

class SolicitacoesRepository implements ISolicitacoesRepository {
  async buscarSolicitacoes({
    empresaOperadora,
    contaContrato,
    codigoNota,
    telefone,
  }: IBuscarSolicitacaoDTO): Promise<Solicitacao[]> {
    const owner = obterOwnerPorCodigoOperadora(empresaOperadora);

    let query = `SELECT * FROM ${owner}.CLARA_SOLICITACOES WHERE CONTA_CONTRATO = '${completarComZeros(
      contaContrato,
      12,
    )}'`;

    if (codigoNota) {
      query += ` AND CODIGO_NOTA = '${completarComZeros(codigoNota, 12)}'`;
    }

    if (telefone) {
      if (telefone.length === 10) {
        query += ` AND TELEFONE = '${telefone}'`;
      } else if (telefone.length === 11) {
        query += ` AND TELEFONE_9 = '${telefone}'`;
      }
    }

    query += ' ORDER BY DATA_SOLICITACAO DESC';

    const solicitacoesResponse: ISolicitacaoResponse[] = await knex.raw(query);

    if (!solicitacoesResponse) {
      return [];
    }

    const solicitacoes = solicitacoesResponse.map(
      solicitacao =>
        new Solicitacao({
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
          sessaoAtiva: verificarSessaoAtiva(solicitacao),
        }),
    );

    return solicitacoes;
  }
}

export default SolicitacoesRepository;
