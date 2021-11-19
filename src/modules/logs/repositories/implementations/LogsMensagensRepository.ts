import knex from '../../../../database';
import inserirApostrofo from '../../../../util/inserirApostrofo';
import obterEmpresaPorCodigoOperadora from '../../../../util/obterEmpresaPorCodigoOperadora';
import obterOwnerPorCodigoOperadora from '../../../../util/obterOwnerPorCodigoOperadora';
import IGravarLogMensagemDTO from '../../dtos/IGravarLogMensagemDTO';
import ILogsMensagensRepository from '../ILogsMensagensRepository';

class LogsMensagensRepository implements ILogsMensagensRepository {
  async gravarLogMensagem(data: IGravarLogMensagemDTO): Promise<void> {
    const owner = obterOwnerPorCodigoOperadora(data.empresaOperadora);

    const empresa = obterEmpresaPorCodigoOperadora(data.empresaOperadora);

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
      '${data.canal}',
      ${data.sessao ? inserirApostrofo(data.sessao) : null},
      '${data.telefone}',
      TO_TIMESTAMP_TZ('${data.dataEnvio}', 'YYYY-MM-DD"t"HH24:MI:SS.FF7TZR'),
      '${data.idEnvio}',
      '${data.mensagemEnviada}',
      '${data.tipoSolicitacao}',
      ${data.codigoServico ? inserirApostrofo(data.codigoServico) : null},
      ${data.codigoNota ? inserirApostrofo(data.codigoNota) : null},
      '${data.contaContrato}',
      ${data.status ? inserirApostrofo(data.status) : null},
      '${data.categoria}',
      ${data.usuario ? inserirApostrofo(data.usuario) : null},
      ${data.dataNota ? `TO_DATE('${data.dataNota}', 'DD/MM/YYYY')` : null}
    )`;

    await knex.raw(query);
    await knex.raw('COMMIT');
  }
}

export default LogsMensagensRepository;
