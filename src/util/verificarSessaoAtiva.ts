import { differenceInHours } from 'date-fns';

function verificarSessaoAtiva(dataSolicitacao: Date): boolean {
  const diferencaEmHoras = differenceInHours(new Date(), dataSolicitacao);

  if (diferencaEmHoras < 24) {
    return true;
  }

  return false;
}

export default verificarSessaoAtiva;
