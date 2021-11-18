import { v4 as uuidv4 } from 'uuid';

import apiYaloNotification from '../../../../services/apiYaloNotification';
import apiYaloOutgoing from '../../../../services/apiYaloOutgoing';
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
      await apiYaloNotification.post(`/${id}/notifications`, {
        type: process.env.TYPE_MESSAGE_YALO,
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
    } else {
      await apiYaloOutgoing.post(
        `/${id}/messages`,
        {
          id: uuidv4(),
          preview_url: true,
          type: 'text',
          text: `Segue o link para acompanhamento ${link}`, // HARD CODDED
          userId: `+55${outgoingToken}`,
        },
        {
          headers: {
            Authorization: `Bearer ${outgoingToken}`,
          },
        },
      );
    }
  }
}

export default MensagensRepository;
