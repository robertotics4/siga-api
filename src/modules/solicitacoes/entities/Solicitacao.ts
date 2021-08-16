class Solicitacao {
  dataSolicitacao: Date;
  idConversa: string;
  sessao?: string;
  empresa: string;
  contaContrato: string;
  telefone: string;
  telefoneComNove: string;
  codigoServico?: string;
  codigoNota?: string;
  canal: string;
  regional: string;
  municipio: string;
  tipoSolicitacao: string;
  totalSolicitacoes: number;
  sessaoAtiva: boolean;
}

export default Solicitacao;
