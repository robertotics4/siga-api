import knex from '../../../../database';
import AppError from '../../../../errors/AppError';
import completarComZeros from '../../../../util/completarComZeros';
import formatarSolicitacao from '../../../../util/formatarSolicitacao';
import obterOwnerPorEmpresaOperadora from '../../../../util/obterOwnerPorCodigoOperadora';
import Solicitacao from '../../entities/Solicitacao';

interface IRequest {
  empresaOperadora: number;
  contaContrato: string;
  codigoNota?: string;
  telefone?: string;
}

export interface ISolicitacaoResponse {
  DATA_SOLICITACAO: Date;
  ID_CONVERSA: string;
  SESSAO?: string;
  EMPRESA: string;
  CONTA_CONTRATO: string;
  TELEFONE: string;
  TELEFONE_9: string;
  CODIGO_SR?: string;
  CODIGO_NOTA?: string;
  CANAL: string;
  REGIONAL: string;
  MUNICIPIO: string;
  TIPO_SOLICITACAO: string;
  TOTAL_SOLICITACOES: number;
}

class BuscarSolicitacoesUseCase {
  async execute({
    empresaOperadora,
    contaContrato,
    codigoNota,
    telefone,
  }: IRequest): Promise<Solicitacao[]> {
    const owner = obterOwnerPorEmpresaOperadora(empresaOperadora);

    if (!owner) {
      throw new AppError('Código de empresa operadora inválido');
    }

    let query = `SELECT * FROM ${owner}.CLARA_SOLICITACOES WHERE CONTA_CONTRATO = ${
      contaContrato && completarComZeros(contaContrato, 12)
    }`;

    if (codigoNota) {
      query += ` AND CODIGO_NOTA = ${
        codigoNota && completarComZeros(codigoNota, 12)
      }`;
    }

    if (telefone) {
      if (telefone.length === 10) {
        query += ` AND TELEFONE = ${telefone}`;
      } else if (telefone.length === 11) {
        query += ` AND TELEFONE_9 = ${telefone}`;
      }
    }

    query += ' ORDER BY DATA_SOLICITACAO DESC';

    const solicitacoes: ISolicitacaoResponse[] = await knex.raw(query);

    const solicitacoesFormatadas = solicitacoes.map(solicitacao =>
      formatarSolicitacao(solicitacao),
    );

    return solicitacoesFormatadas;
  }
}

export default BuscarSolicitacoesUseCase;
