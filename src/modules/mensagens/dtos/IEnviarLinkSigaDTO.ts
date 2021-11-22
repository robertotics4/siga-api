interface IEnviarLinkSigaDTO {
  empresaOperadora: number;
  telefone: string;
  contaContrato: string;
  codigoNota: string;
  tipoSolicitacao: string;
  link: string;
  sessao?: string;
}

export default IEnviarLinkSigaDTO;
