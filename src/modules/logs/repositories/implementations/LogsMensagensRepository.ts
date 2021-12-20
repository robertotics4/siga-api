import knex from '../../../../database';
import completarComZeros from '../../../../util/completarComZeros';
import converterDateParaString from '../../../../util/converterDateParaString';
import inserirApostrofo from '../../../../util/inserirApostrofo';
import obterEmpresaPorCodigoOperadora from '../../../../util/obterEmpresaPorCodigoOperadora';
import obterOwnerPorCodigoOperadora from '../../../../util/obterOwnerPorCodigoOperadora';
import IBuscarLogsMensagemDTO from '../../dtos/IBuscarLogsMensagemDTO';
import IGravarLogMensagemDTO from '../../dtos/IGravarLogMensagemDTO';
import LogItem from '../../entities/LogItem';
import ILogsMensagensRepository from '../ILogsMensagensRepository';

class LogsMensagensRepository implements ILogsMensagensRepository {
  async gravarLogMensagem({
    empresaOperadora,
    canal,
    sessao,
    telefone,
    dataEnvio,
    idEnvio,
    mensagemEnviada,
    tipoSolicitacao,
    codigoServico,
    codigoNota,
    contaContrato,
    status,
    categoria,
    usuario,
    dataNota,
  }: IGravarLogMensagemDTO): Promise<void> {
    const owner = obterOwnerPorCodigoOperadora(empresaOperadora);

    const empresa = obterEmpresaPorCodigoOperadora(empresaOperadora);

    const query = `INSERT INTO ${owner}.CLARA_MSG_SAIDA_ENVIADA (
      EMPRESA,
      CANAL,
      SESSAO,
      TELEFONE,
      DT_ENVIO_MSG,
      ID_ENVIO,
      MENSAGEM_ENVIADA,
      TIPO_SOLICITACAO,
      CODIGO_SR,
      CODIGO_NOTA,
      CONTA_CONTRATO,
      STATUS,
      CATEGORIA_MSG,
      USUARIO,
      DATA_NOTA
    ) VALUES (
      '${empresa}',
      '${canal}',
      ${sessao ? inserirApostrofo(sessao) : null},
      '${telefone}',
      TO_DATE('${converterDateParaString(dataEnvio)}', 'DD/MM/YYYY HH24:MI:SS'),
      '${idEnvio}',
      '${mensagemEnviada}',
      '${tipoSolicitacao}',
      ${codigoServico ? inserirApostrofo(codigoServico) : null},
      ${codigoNota ? inserirApostrofo(codigoNota) : null},
      '${contaContrato}',
      ${status ? inserirApostrofo(status) : null},
      '${categoria}',
      ${usuario ? inserirApostrofo(usuario) : null},
      ${
        dataNota
          ? `TO_DATE('${converterDateParaString(
              dataNota,
            )}', 'DD/MM/YYYY HH24:MI:SS')`
          : null
      }
    )`;

    await knex.raw(query);
    await knex.raw('COMMIT');
  }

  async buscarLogsMensagem({
    empresaOperadora,
    contaContrato,
    telefone,
    codigoNota,
  }: IBuscarLogsMensagemDTO): Promise<LogItem[]> {
    const owner = obterOwnerPorCodigoOperadora(empresaOperadora);

    let query = `SELECT * FROM ${owner}.CLARA_MSG_SAIDA_ENVIADA WHERE conta_contrato = '${completarComZeros(
      contaContrato,
      12,
    )}' AND telefone = '${telefone}'`;

    if (codigoNota) {
      query += ` AND CODIGO_NOTA = '${completarComZeros(codigoNota, 12)}'`;
    }

    console.log(query);

    const logItens = await knex.raw(query);

    return logItens;
  }
}

export default LogsMensagensRepository;
