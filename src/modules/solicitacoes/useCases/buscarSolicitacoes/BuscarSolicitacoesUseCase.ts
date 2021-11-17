import { inject, injectable } from 'tsyringe';

import Solicitacao from '../../entities/Solicitacao';
import ISolicitacoesRepository from '../../repositories/ISolicitacoesRepository';

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

@injectable()
class BuscarSolicitacoesUseCase {
  constructor(
    @inject('SolicitacoesRepository')
    private solicitacoesRepository: ISolicitacoesRepository,
  ) {}

  async execute({
    empresaOperadora,
    contaContrato,
    codigoNota,
    telefone,
  }: IRequest): Promise<Solicitacao[]> {
    const solicitacoes = await this.solicitacoesRepository.buscarSolicitacoes({
      empresaOperadora,
      contaContrato,
      codigoNota,
      telefone,
    });

    return solicitacoes;
  }
}

export default BuscarSolicitacoesUseCase;
