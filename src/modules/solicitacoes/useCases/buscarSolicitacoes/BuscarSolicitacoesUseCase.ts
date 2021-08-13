import knex from '../../../../database';
import AppError from '../../../../errors/AppError';
import completarComZeros from '../../../../util/completarComZeros';
import obterOwnerPorEmpresaOperadora from '../../../../util/obterOwnerPorCodigoOperadora';
import verificarSessaoAtiva from '../../../../util/verificarSessaoAtiva';
import Solicitacao from '../../entities/Solicitacao';

interface IRequest {
  empresaOperadora: number;
  contaContrato: string;
  codigoNota?: string;
  telefone?: string;
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
      throw new AppError('Empresa operadora inexistente');
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

    const solicitacoes: Solicitacao[] = await knex.raw(query);

    solicitacoes.forEach(solicitacao => {
      Object.assign(solicitacao, {
        ...solicitacao,
        sessaoAtiva: verificarSessaoAtiva(solicitacao.dataSolicitacao),
      });
    });

    return solicitacoes;
  }
}

export default BuscarSolicitacoesUseCase;
