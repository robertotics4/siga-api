import ISolicitacaoDTO from '../dtos/ISolicitacaoDTO';

class Solicitacao {
  constructor(data: ISolicitacaoDTO) {
    this.dataSolicitacao = data.dataSolicitacao;
    this.idConversa = data.idConversa;
    this.sessao = data.sessao;
    this.empresa = data.empresa;
    this.telefone = data.telefone;
    this.telefoneComNove = data.telefoneComNove;
    this.codigoServico = data.codigoServico;
    this.codigoNota = data.codigoNota;
    this.canal = data.canal;
    this.regional = data.regional;
    this.municipio = data.municipio;
    this.tipoSolicitacao = data.tipoSolicitacao;
    this.totalSolicitacoes = data.totalSolicitacoes;
    this.sessaoAtiva = data.sessaoAtiva;
  }

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
