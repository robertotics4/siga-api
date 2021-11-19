import knex from '../../../../database';
import converterDateParaString from '../../../../util/converterDateParaString';
import inserirApostrofo from '../../../../util/inserirApostrofo';
import obterEmpresaPorCodigoOperadora from '../../../../util/obterEmpresaPorCodigoOperadora';
import obterOwnerPorCodigoOperadora from '../../../../util/obterOwnerPorCodigoOperadora';
import IGravarLogMensagemDTO from '../../dtos/IGravarLogMensagemDTO';
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
}

export default LogsMensagensRepository;
