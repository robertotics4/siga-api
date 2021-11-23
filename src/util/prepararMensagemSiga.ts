function prepararMensagemSiga(
  servico: string,
  codigoNota: string,
  link: string,
): string {
  return `Olá! ☺️ Tenho novidades sobre o seu serviço de ${servico} (*${codigoNota}*): *nossa equipe já está a caminho!* 🚙💨

E olha que legal 🤩 pelo link abaixo você acompanha o nosso deslocamento em *tempo real* até o seu imóvel
${link}`;
}

export default prepararMensagemSiga;
