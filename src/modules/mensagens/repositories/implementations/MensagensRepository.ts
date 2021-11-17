import IEnviarLinkSigaDTO from '../../dtos/IEnviarLinkSigaDTO';
import IMensagensRepository from '../IMensagensRepository';

class MensagensRepository implements IMensagensRepository {
  async enviarLinkSiga({
    empresaOperadora,
    contaContrato,
    codigoNota,
    link,
  }: IEnviarLinkSigaDTO): Promise<void> {
    // Lógica do repository
  }
}

export default MensagensRepository;
