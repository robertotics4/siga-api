class LogItem {
  empresa: string;

  canal: string;

  sessao?: string;

  telefone: string;

  dataEnvioMsg: Date;

  idEnvio: string;

  mensagemEnviada: string;

  tipoSolicitacao: string;

  codigoServico?: string;

  codigoNota?: string;

  status?: 'PROCEDENTE' | 'IMPROCEDENTE';

  categoriaMsg: 'PUSH' | 'SERVICO' | 'PUSH - ATIVO' | 'SERVICO - ATIVO';

  dataNota?: Date;
}

export default LogItem;
