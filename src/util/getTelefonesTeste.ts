export function getTelefonesTeste(): string[] | undefined {
  const strEnvTelefones = process.env.TELEFONES_TESTE;

  return strEnvTelefones ? strEnvTelefones.split(',') : undefined;
}
