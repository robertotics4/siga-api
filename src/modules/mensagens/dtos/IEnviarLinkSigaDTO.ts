interface IEnviarLinkSigaDTO {
  empresaOperadora: number;
  telefone: string;
  contaContrato: string;
  codigoNota: string;
  tipoSolicitacao: string;
  link: string;
  idSessaoAtiva?: string;
  tipoMensagem: 'INICIAR' | 'CONCLUIR' | 'CANCELAR';
}

export default IEnviarLinkSigaDTO;
