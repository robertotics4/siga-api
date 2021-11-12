import knex from '../../../../database';
import AppError from '../../../../errors/AppError';
import completarComZeros from '../../../../util/completarComZeros';
import obterEmpresaPorCodigoOperadora from '../../../../util/obterEmpresaPorCodigoOperadora';
import Cliente from '../../entities/Cliente';

interface IRequest {
  empresaOperadora: number;
  contaContrato: string;
}

interface IClienteResponse {
  EMPRESA: string;
  INSTALACAO: string;
  CONTRATO: string;
  CONTA_CONTRATO: string;
  PARCEIRO_NEGOCIO: string;
  NOME: string;
  CPF?: string;
  CNPJ?: string;
  EMAIL?: string;
  TEL_FIXO?: string;
  TEL_MOVEL?: string;
}

class BuscarClienteTabCadastroUseCase {
  async execute({
    empresaOperadora,
    contaContrato,
  }: IRequest): Promise<Cliente> {
    const empresa = obterEmpresaPorCodigoOperadora(empresaOperadora);

    if (!empresa) {
      throw new AppError('Código de empresa operadora inválido');
    }

    if (!contaContrato) {
      throw new AppError('A conta contrato é obrigatória');
    }

    const query = `SELECT * FROM ${empresa}.TAB_CADASTRO WHERE CONTA_CONTRATO = ${completarComZeros(
      contaContrato,
      12,
    )}`;

    const dadosCliente: IClienteResponse[] = await knex.raw(query);

    if (!dadosCliente.length) {
      throw new AppError('Cliente não encontrado');
    }

    const cliente = new Cliente({
      empresa: dadosCliente[0].EMPRESA,
      instalacao: dadosCliente[0].INSTALACAO,
      contrato: dadosCliente[0].CONTRATO,
      contaContrato: dadosCliente[0].CONTA_CONTRATO,
      parceiroNegocio: dadosCliente[0].PARCEIRO_NEGOCIO,
      nome: dadosCliente[0].NOME,
      cpf: dadosCliente[0].CPF,
      cnpj: dadosCliente[0].CNPJ,
      email: dadosCliente[0].EMAIL,
      telefoneFixo: dadosCliente[0].TEL_FIXO,
      telefoneMovel: dadosCliente[0].TEL_MOVEL,
    });

    return cliente;
  }
}

export default BuscarClienteTabCadastroUseCase;
