import { v4 as uuidv4 } from 'uuid';

import apiYaloNotification from '../../../../services/apiYaloNotification';
import apiYaloOutgoing from '../../../../services/apiYaloOutgoing';
import getRequestYaloInfo from '../../../../util/getRequestYaloInfo';
import prepararMensagemSiga from '../../../../util/prepararMensagemSiga';
import IEnviarLinkSigaDTO from '../../dtos/IEnviarLinkSigaDTO';
import IMensagensRepository from '../IMensagensRepository';

class MensagensRepository implements IMensagensRepository {
  async enviarLinkSiga({
    empresaOperadora,
    telefone,
    contaContrato,
    codigoNota,
    tipoSolicitacao,
    link,
    idSessaoAtiva,
  }: IEnviarLinkSigaDTO): Promise<void> {
    const { id, outgoingToken } = getRequestYaloInfo(empresaOperadora);

    if (!idSessaoAtiva) {
      await apiYaloNotification.post(`/${id}/notifications`, {
        type: process.env.TYPE_MESSAGE_YALO,
        users: [
          {
            phone: `+55${telefone}`,
            params: {
              servico: tipoSolicitacao,
              link,
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
          text: {
            body: prepararMensagemSiga(tipoSolicitacao, codigoNota, link),
          },
          userId: `55${telefone}`,
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
