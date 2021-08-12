import { Router } from 'express';

import knex from '../database';
import obterOwnerPorEmpresaOperadora from '../util/obterOwnerPorEmpresaOperadora';

const solicitacoesRotas = Router();

solicitacoesRotas.get('/solicitacoes', async (request, response) => {
  try {
    const { empresaOperadora, contaContrato, codigoNota } = request.query;

    const owner = obterOwnerPorEmpresaOperadora(Number(empresaOperadora));

    if (!owner) {
      return response.status(400).json({ error: 'Empresa operadora inválida' });
    }

    if (!contaContrato) {
      return response
        .status(400)
        .json({ error: 'A conta contrato é obrigatória' });
    }

    const query = `SELECT * FROM ${owner}.CLARA_SOLICITACOES WHERE CONTA_CONTRATO = ${contaContrato}`;

    const solicitacoes = await knex.raw(
      codigoNota ? `${query} AND CODIGO_NOTA = ${codigoNota}` : query,
    );

    return response.json(solicitacoes);
  } catch (err) {
    return response.json({ message: err.message });
  }
});

export default solicitacoesRotas;
