import IEnviarLinkSigaDTO from '../dtos/IEnviarLinkSigaDTO';

interface IMensagensRepository {
  enviarLinkSiga({
    empresaOperadora,
    telefone,
    contaContrato,
    codigoNota,
    link,
  }: IEnviarLinkSigaDTO): Promise<void>;
}

export default IMensagensRepository;
