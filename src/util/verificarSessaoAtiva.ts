import { differenceInHours } from 'date-fns';

import { ISolicitacaoResponse } from '../modules/solicitacoes/useCases/buscarSolicitacoes/BuscarSolicitacoesUseCase';

function verificarSessaoAtiva(solicitacao: ISolicitacaoResponse): boolean {
  if (solicitacao.CANAL.toLowerCase() === 'whatsapp') {
    const diferencaEmHoras = differenceInHours(
      new Date(),
      solicitacao.DATA_SOLICITACAO,
    );

    if (diferencaEmHoras < 24) {
      return true;
    }
  }

  return false;
}

export default verificarSessaoAtiva;
