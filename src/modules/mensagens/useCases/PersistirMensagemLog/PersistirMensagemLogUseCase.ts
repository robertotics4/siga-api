import knex from '../../../../database';
import AppError from '../../../../errors/AppError';
import obterEmpresaPorCodigoOperadora from '../../../../util/obterEmpresaPorCodigoOperadora';
import obterOwnerPorEmpresaOperadora from '../../../../util/obterOwnerPorCodigoOperadora';

interface IRequest {
  empresaOperadora: number;
  canal: string;
  sessao?: string;
  telefone: string;
  dataEnvio: Date;
  idEnvio: string;
  mensagemEnviada: string;
  tipoSolicitacao: string;
  codigoServico?: string;
  codigoNota?: string;
  contaContrato: string;
  status?: string;
  categoria: string;
  usuario?: string;
  dataNota?: string;
}

class PersistirMensagemLogUseCase {
  async execute({
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
  }: IRequest): Promise<void> {
    const owner = obterOwnerPorEmpresaOperadora(empresaOperadora);

    if (!owner) {
      throw new AppError('Empresa operadora inválida', 400);
    }

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
      '${sessao}',
      '${telefone}',
      '${dataEnvio}',
      '${idEnvio}',
      '${mensagemEnviada}',
      '${tipoSolicitacao}',
      '${codigoServico}',
      '${codigoNota}',
      '${contaContrato}',
      '${status}',
      '${categoria}',
      '${usuario}',
      '${dataNota}'
    )`;

    await knex.raw(query);
    await knex.raw('COMMIT');
  }
}

export default PersistirMensagemLogUseCase;
