import apiYaloNotification from '../../../../services/apiYaloNotification';
import getRequestYaloInfo from '../../../../util/getRequestYaloInfo';
import IEnviarLinkSigaDTO from '../../dtos/IEnviarLinkSigaDTO';
import IMensagensRepository from '../IMensagensRepository';

class MensagensRepository implements IMensagensRepository {
  async enviarLinkSiga({
    empresaOperadora,
    telefone,
    contaContrato,
    codigoNota,
    link,
    sessao,
  }: IEnviarLinkSigaDTO): Promise<void> {
    const { id, outgoingToken } = getRequestYaloInfo(empresaOperadora);

    if (!sessao) {
      const { data } = await apiYaloNotification.post(`/${id}/notifications`, {
        type: 'retorno-servico-procedente',
        users: [
          {
            phone: `+55${telefone}`,
            params: {
              servico: contaContrato,
              data: new Date(),
              protocolo: codigoNota,
              motivo: link,
            },
          },
        ],
      });
    }
  }
}

export default MensagensRepository;
