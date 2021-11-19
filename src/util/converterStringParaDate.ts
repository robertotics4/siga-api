import ptBR, { parse } from 'date-fns';

function converterStringParaDate(data: string): Date {
  if (data) {
    const stringData = data.replace(/-/g, '/');

    const regexDate =
      /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

    const regexDateTime = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})$/;

    if (stringData.match(regexDate)) {
      return parse(stringData, 'dd/MM/yyyy', new Date(), {
        locale: ptBR,
      });
    }

    if (stringData.match(regexDateTime)) {
      return parse(stringData, 'dd/MM/yyyy HH:mm:ss', new Date(), {
        locale: ptBR,
      });
    }
  }

  return undefined;
}

export default converterStringParaDate;
