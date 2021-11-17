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

interface ITelefone {
  tipo: 'FIXO' | 'MOVEL';
  numero: string;
}

class ClientesTabCadastroRepository {
  async buscarPorContaContrato({
    empresaOperadora,
    contaContrato,
  }: IBuscarPorContaContratoDTO): Promise<Cliente> {
    const empresa = obterEmpresaPorCodigoOperadora(empresaOperadora);

    const query = `SELECT NOME, CONTA_CONTRATO, EMAIL, TEL_FIXO, TEL_MOVEL FROM ${empresa}.TAB_CADASTRO WHERE CONTA_CONTRATO = ${completarComZeros(
      contaContrato,
      12,
    )}`;

    const dadosCliente: IClienteResponse[] = await knex.raw(query);

    if (!dadosCliente.length) {
      return undefined;
    }

    const telefones: ITelefone[] = [];

    if (dadosCliente[0].TEL_FIXO) {
      telefones.push({
        tipo: 'FIXO',
        numero: dadosCliente[0].TEL_FIXO.toString(),
      });
    }

    if (dadosCliente[0].TEL_MOVEL) {
      telefones.push({
        tipo: 'MOVEL',
        numero: dadosCliente[0].TEL_MOVEL.toString(),
      });
    }

    const telefoneFixo = telefones.filter(telefone => telefone.tipo === 'FIXO');
    const telefoneMovel = telefones.filter(
      telefone => telefone.tipo === 'MOVEL',
    );

    const email = dadosCliente[0].EMAIL ? dadosCliente[0].EMAIL : '';

    const cliente = new Cliente({
      contaContrato: dadosCliente[0].CONTA_CONTRATO,
      nome: dadosCliente[0].NOME,
      telefoneFixo: telefoneFixo.length
        ? telefoneFixo.map(telefone => telefone.numero)
        : [],
      telefoneMovel: telefoneMovel.length
        ? telefoneMovel.map(telefone => telefone.numero)
        : [],
      email,
    });

    return cliente;
  }
}

export default ClientesTabCadastroRepository;
