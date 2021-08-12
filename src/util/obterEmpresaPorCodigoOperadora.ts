function obterEmpresaPorCodigoOperadora(
  codigoOperadora: number,
): string | undefined {
  switch (codigoOperadora) {
    case 98:
      return 'CEMAR';
    case 95:
      return 'CELPA';
    case 82:
      return 'CEAL';
    case 86:
      return 'CEPISA';
    default:
      return undefined;
  }
}

export default obterEmpresaPorCodigoOperadora;
