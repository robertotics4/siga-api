import IEnviarLinkSigaDTO from '../dtos/IEnviarLinkSigaDTO';

interface IMensagensRepository {
  enviarLinkSiga({
    empresaOperadora,
    telefone,
    contaContrato,
    codigoNota,
    link,
    sessao,
  }: IEnviarLinkSigaDTO): Promise<void>;
}

export default IMensagensRepository;
