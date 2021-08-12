function obterOwnerPorCodigoOperadora(
  codigoOperadora: number,
): string | undefined {
  switch (codigoOperadora) {
    case 98:
      return 'OWDINCMR';
    case 95:
      return 'OWDINCLP';
    case 82:
      return 'OWDINCEL';
    case 86:
      return 'OWDINCPS';
    default:
      return undefined;
  }
}

export default obterOwnerPorCodigoOperadora;
