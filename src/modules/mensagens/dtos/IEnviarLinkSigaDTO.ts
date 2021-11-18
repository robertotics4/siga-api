interface IEnviarLinkSigaDTO {
  empresaOperadora: number;
  telefone: string;
  contaContrato: string;
  codigoNota: string;
  link: string;
  sessao?: string;
}

export default IEnviarLinkSigaDTO;
