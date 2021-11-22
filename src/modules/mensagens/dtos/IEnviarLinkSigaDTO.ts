interface IEnviarLinkSigaDTO {
  empresaOperadora: number;
  telefone: string;
  contaContrato: string;
  codigoNota: string;
  tipoSolicitacao: string;
  link: string;
  idSessaoAtiva?: string;
}

export default IEnviarLinkSigaDTO;
