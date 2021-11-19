import { inject, injectable } from 'tsyringe';

import converterStringParaDate from '../../../../util/converterStringParaDate';
import ILogsMensagensRepository from '../../repositories/ILogsMensagensRepository';

interface IRequest {
  empresaOperadora: number;
  canal: string;
  sessao?: string;
  telefone: string;
  dataEnvio: string;
  idEnvio: string;
  mensagemEnviada: string;
  tipoSolicitacao: string;
  codigoServico?: string;
  codigoNota?: string;
  contaContrato: string;
  status?: string;
  categoria: 'PUSH' | 'PUSH - ATIVO' | 'SERVICO' | 'SERVICO - ATIVO';
  usuario?: string;
  dataNota?: string;
}

@injectable()
class GravarLogMensagemUseCase {
  constructor(
    @inject('LogsMensagensRepository')
    private logsMensagensRepository: ILogsMensagensRepository,
  ) {}

  async execute({
    empresaOperadora,
    canal,
    sessao,
    telefone,
    dataEnvio,
    idEnvio,
    mensagemEnviada,
    tipoSolicitacao,
    codigoServico,
    codigoNota,
    contaContrato,
    status,
    categoria,
    usuario,
    dataNota,
  }: IRequest): Promise<void> {
    await this.logsMensagensRepository.gravarLogMensagem({
      empresaOperadora,
      canal,
      sessao,
      telefone,
      dataEnvio: converterStringParaDate(dataEnvio),
      idEnvio,
      mensagemEnviada,
      tipoSolicitacao,
      codigoServico,
      codigoNota,
      contaContrato,
      status,
      categoria,
      usuario,
      dataNota: converterStringParaDate(dataNota) || undefined,
    });
  }
}

export default GravarLogMensagemUseCase;
