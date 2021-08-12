import knex from '../../../../database';
import AppError from '../../../../errors/AppError';
import obterOwnerPorEmpresaOperadora from '../../../../util/obterOwnerPorEmpresaOperadora';
import Solicitacao from '../../entities/Solicitacao';

interface IRequest {
  empresaOperadora: number;
  contaContrato: string;
  codigoNota?: string;
}

class BuscarSolicitacoesUseCase {
  async execute({
    empresaOperadora,
    contaContrato,
    codigoNota,
  }: IRequest): Promise<Solicitacao[]> {
    const owner = obterOwnerPorEmpresaOperadora(Number(empresaOperadora));

    if (!owner) {
      throw new AppError('Empresa operadora inválida', 400);
    }

    if (!contaContrato) {
      throw new AppError('A conta contrato é obrigatória', 400);
    }

    const query = `SELECT * FROM ${owner}.CLARA_SOLICITACOES WHERE CONTA_CONTRATO = ${contaContrato}`;

    const solicitacoes = await knex.raw(
      codigoNota ? `${query} AND CODIGO_NOTA = ${codigoNota}` : query,
    );

    return solicitacoes;
  }
}

export default BuscarSolicitacoesUseCase;
