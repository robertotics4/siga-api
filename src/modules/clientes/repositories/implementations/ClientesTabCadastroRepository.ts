import knex from '../../../../database';
import completarComZeros from '../../../../util/completarComZeros';
import obterEmpresaPorCodigoOperadora from '../../../../util/obterEmpresaPorCodigoOperadora';
import IBuscarPorContaContratoDTO from '../../../dtos/IBuscarPorContaContratoDTO';
import Cliente from '../../entities/Cliente';

interface IClienteResponse {
  CONTA_CONTRATO: string;
  NOME: string;
  EMAIL?: string;
  TEL_FIXO?: string;
  TEL_MOVEL?: string;
}

class ClientesTabCadastroRepository {
  async buscarPorContaContrato({
    empresaOperadora,
    contaContrato,
  }: IBuscarPorContaContratoDTO): Promise<Cliente> {
    const empresa = obterEmpresaPorCodigoOperadora(empresaOperadora);

    const query = `SELECT * FROM ${empresa}.TAB_CADASTRO WHERE CONTA_CONTRATO = ${completarComZeros(
      contaContrato,
      12,
    )}`;

    const dadosCliente: IClienteResponse[] = await knex.raw(query);

    if (!dadosCliente.length) {
      return undefined;
    }

    const telFixos = [];
    const telMoveis = [];

    if (dadosCliente[0].TEL_FIXO !== undefined) {
      telFixos.push(dadosCliente[0].TEL_FIXO.toString());
    }

    if (dadosCliente[0].TEL_MOVEL !== undefined) {
      telMoveis.push(dadosCliente[0].TEL_MOVEL.toString());
    }

    const cliente = new Cliente({
      contaContrato: dadosCliente[0].CONTA_CONTRATO,
      nome: dadosCliente[0].NOME,
      email: dadosCliente[0].EMAIL,
      telefoneFixo: telFixos,
      telefoneMovel: telMoveis,
    });

    return cliente;
  }
}

export default ClientesTabCadastroRepository;
