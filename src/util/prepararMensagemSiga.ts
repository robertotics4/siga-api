import { getTipoSolicitacaoCompleto } from './getTipoSolicitacaoCompleto';

function prepararMensagemSiga(
  servico: string,
  codigoNota: string,
  tipoMensagem: 'INICIAR' | 'CONCLUIR' | 'CANCELAR',
  link?: string,
): string {
  const tipoSolicitacaoCompleto = getTipoSolicitacaoCompleto(servico);

  switch (tipoMensagem) {
    case 'INICIAR':
      return `Olá! ☺️ Tenho novidades sobre o seu serviço de ${
        tipoSolicitacaoCompleto || 'energia'
      }: *nossa equipe já está a caminho!* 🚙💨
E olha que legal 🤩 pelo link abaixo você acompanha o nosso deslocamento em *tempo real* até o seu imóvel
${link}`;
    case 'CONCLUIR':
      return `Olá! Seu serviço de ${servico} (*${codigoNota}*) foi concluído. Agradecemos sua atenção`;
    case 'CANCELAR':
      return `Olá! Seu serviço de ${servico} (*${codigoNota}*) foi cancelado. Pedimos desculpas`;
    default:
      return '';
  }
}

export default prepararMensagemSiga;
