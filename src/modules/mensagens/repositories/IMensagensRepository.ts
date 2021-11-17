import IEnviarLinkSigaDTO from '../dtos/IEnviarLinkSigaDTO';

interface IMensagensRepository {
  enviarLinkSiga({
    empresaOperadora,
    contaContrato,
    codigoNota,
    link,
  }: IEnviarLinkSigaDTO): Promise<void>;
}

export default IMensagensRepository;
