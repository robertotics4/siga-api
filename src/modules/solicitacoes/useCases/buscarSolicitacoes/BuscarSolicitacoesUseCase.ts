import knex from '../../../../database';
import AppError from '../../../../errors/AppError';
import obterOwnerPorEmpresaOperadora from '../../../../util/obterOwnerPorCodigoOperadora';
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
      throw new AppError('Empresa operadora inválida', 400);
    }

    if (!contaContrato) {
      throw new AppError('A conta contrato é obrigatória', 400);
    }

    let query = `SELECT * FROM ${owner}.CLARA_SOLICITACOES WHERE CONTA_CONTRATO = ${contaContrato}`;

    if (codigoNota) {
      query += ` AND CODIGO_NOTA = ${codigoNota}`;
    }

    if (telefone) {
      query += ` AND TELEFONE = ${telefone}`;
    }

    const solicitacoes: Solicitacao[] = await knex.raw(query);

    return solicitacoes;
  }
}

export default BuscarSolicitacoesUseCase;
