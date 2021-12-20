import { getHours } from 'date-fns';

import AppError from '../errors/AppError';

function isWithinOfficeHours(): boolean {
  if (
    !process.env.HORA_INICIO_ATENDIMENTO ||
    !process.env.HORA_FIM_ATENDIMENTO
  ) {
    throw new AppError('Hora inicio/fim de atendimento inválidos');
  }

  const horaInicioAtendimento = Number(process.env.HORA_INICIO_ATENDIMENTO);
  const horaFimAtendimento = Number(process.env.HORA_FIM_ATENDIMENTO);

  if (
    !(horaInicioAtendimento >= 0 && horaInicioAtendimento <= 23) ||
    !(horaFimAtendimento >= 0 && horaFimAtendimento <= 23)
  ) {
    throw new AppError('Hora inicio/fim de atendimento inválidos');
  }

  const now = new Date();

  console.log({
    horaInicioAtendimento,
    horaFimAtendimento,
    horaAtual: getHours(now),
  });

  if (
    getHours(now) < horaInicioAtendimento ||
    getHours(now) > horaFimAtendimento
  ) {
    return false;
  }

  return true;
}

export default isWithinOfficeHours;
