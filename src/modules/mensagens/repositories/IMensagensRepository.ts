import IEnviarLinkSigaDTO from '../dtos/IEnviarLinkSigaDTO';

interface IMensagensRepository {
  enviarLinkSiga({
    empresaOperadora,
    telefone,
    contaContrato,
    codigoNota,
    tipoSolicitacao,
    link,
    idSessaoAtiva,
  }: IEnviarLinkSigaDTO): Promise<void>;
}

export default IMensagensRepository;
