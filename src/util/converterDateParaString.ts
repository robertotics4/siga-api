import ptBR, { format } from 'date-fns';

function converterDateParaString(data: Date): string {
  if (!data) {
    return undefined;
  }

  return format(data, 'dd/MM/yyyy HH:mm:ss', { locale: ptBR });
}

export default converterDateParaString;
