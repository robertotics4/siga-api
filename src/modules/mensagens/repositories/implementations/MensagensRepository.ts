import { v4 as uuidv4 } from 'uuid';

import apiYaloNotification from '../../../../services/apiYaloNotification';
import apiYaloOutgoing from '../../../../services/apiYaloOutgoing';
import getRequestYaloInfo from '../../../../util/getRequestYaloInfo';
import prepararMensagemSiga from '../../../../util/prepararMensagemSiga';
import IEnviarLinkSigaDTO from '../../dtos/IEnviarLinkSigaDTO';
import IMensagensRepository from '../IMensagensRepository';

const messageTemplates = {
  INICIAR: process.env.TYPE_MESSAGE_YALO_START,
  CONCLUIR: process.env.TYPE_MESSAGE_YALO_CONCLUDE,
  CANCELAR: process.env.TYPE_MESSAGE_YALO_CANCEL,
};

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
    const messageTemplate = messageTemplates.INICIAR;

    if (!idSessaoAtiva) {
      await apiYaloNotification.post(`/${id}/notifications`, {
        type: messageTemplate,
        users: [
          {
            phone: `+55${telefone}`,
            params: {
              servico: tipoSolicitacao || 'energia',
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
            body: prepararMensagemSiga(
              tipoSolicitacao || 'energia',
              codigoNota,
              'INICIAR',
              link,
            ),
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
