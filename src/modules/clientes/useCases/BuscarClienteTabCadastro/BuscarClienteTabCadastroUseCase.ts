import { inject, injectable } from 'tsyringe';

import AppError from '../../../../errors/AppError';
import Cliente from '../../entities/Cliente';
import IClientesTabCadastroRepository from '../../repositories/IClientesTabCadastroRepository';

interface IRequest {
  empresaOperadora: number;
  contaContrato: string;
}

@injectable()
class BuscarClienteTabCadastroUseCase {
  constructor(
    @inject('ClientesTabCadastroRepository')
    private clientesTabCadastroRepository: IClientesTabCadastroRepository,
  ) {}

  async execute({
    empresaOperadora,
    contaContrato,
  }: IRequest): Promise<Cliente> {
    const cliente =
      await this.clientesTabCadastroRepository.buscarPorContaContrato({
        empresaOperadora,
        contaContrato,
      });

    if (!cliente) {
      throw new AppError('Cliente não encontrado');
    }

    return cliente;
  }
}

export default BuscarClienteTabCadastroUseCase;
