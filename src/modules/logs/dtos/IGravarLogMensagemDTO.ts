interface IGravarLogMensagemDTO {
  empresaOperadora: number;
  canal: string;
  sessao?: string;
  telefone: string;
  dataEnvio: Date;
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

export default IGravarLogMensagemDTO;
