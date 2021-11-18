import Solicitacao from '../modules/solicitacoes/entities/Solicitacao';

function verificarTelefoneMaisUsado(solicitacoes: Solicitacao[]): string {
  if (!solicitacoes.length) {
    return undefined;
  }

  const telefones = solicitacoes.map(solicitacao => solicitacao.telefone);

  const ocorrencias = telefones.reduce((acc, curr) => {
    if (!acc[curr]) {
      acc[curr] = 1;
    } else {
      acc[curr] += 1;
    }

    return acc;
  }, {});

  const chaves = Object.keys(ocorrencias);
  const valores = Object.values(ocorrencias) as number[];

  const indiceMaisRepetido = valores.indexOf(Math.max(...valores));

  return chaves[indiceMaisRepetido];
}

export default verificarTelefoneMaisUsado;
