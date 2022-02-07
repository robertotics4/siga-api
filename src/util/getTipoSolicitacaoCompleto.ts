const tiposSolicitacao = {
  LG: 'Ligação Nova',
  RL: 'Relilgação',
};

export function getTipoSolicitacaoCompleto(
  tipoSolicitacao: string,
): string | undefined {
  const keys = Object.keys(tiposSolicitacao);

  if (keys.includes(tipoSolicitacao)) {
    const tipoSolicitacaoCompleto = tiposSolicitacao[tipoSolicitacao];

    return tipoSolicitacaoCompleto;
  }

  return undefined;
}
