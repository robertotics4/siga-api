import knex from '../../../../database';
import completarComZeros from '../../../../util/completarComZeros';
import obterEmpresaPorCodigoOperadora from '../../../../util/obterEmpresaPorCodigoOperadora';
import Cliente from '../../entities/Cliente';
import { IBuscarPorContaContratoDTO } from '../IClientesTabCadastroRepository';

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
    console.log(empresa);

    const query = `SELECT * FROM ${empresa}.TAB_CADASTRO WHERE CONTA_CONTRATO = ${completarComZeros(
      contaContrato,
      12,
    )}`;

    const dadosCliente: IClienteResponse[] = await knex.raw(query);

    if (!dadosCliente.length) {
      return undefined;
    }

    const cliente = new Cliente({
      contaContrato: dadosCliente[0].CONTA_CONTRATO,
      nome: dadosCliente[0].NOME,
      email: dadosCliente[0].EMAIL,
      telefoneFixo: dadosCliente[0].TEL_FIXO,
      telefoneMovel: dadosCliente[0].TEL_MOVEL,
    });

    return cliente;
  }
}

export default ClientesTabCadastroRepository;
