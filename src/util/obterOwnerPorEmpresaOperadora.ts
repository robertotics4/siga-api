function obterOwnerPorEmpresaOperadora(codigo: number): string | undefined {
  switch (codigo) {
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

export default obterOwnerPorEmpresaOperadora;
