import IEnviarLinkSigaDTO from '../dtos/IEnviarLinkSigaDTO';

interface IMensagensRepository {
  enviarLinkSiga({
    empresaOperadora,
    telefone,
    contaContrato,
    codigoNota,
    link,
    tipoMensagem,
  }: IEnviarLinkSigaDTO): Promise<void>;
}

export default IMensagensRepository;
