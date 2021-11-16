import { inject, injectable } from 'tsyringe';

import AppError from '../../../../errors/AppError';
import Cliente from '../../entities/Cliente';
import IClientesAPIRepository from '../../repositories/IClientesAPIRepository';

interface IRequest {
  empresaOperadora: number;
  contaContrato: string;
}

@injectable()
class BuscarClienteAPIUseCase {
  constructor(
    @inject('ClientesAPIRepository')
    private clientesAPIRepository: IClientesAPIRepository,
  ) {}
  async execute({
    empresaOperadora,
    contaContrato,
  }: IRequest): Promise<Cliente> {
    const cliente = await this.clientesAPIRepository.buscarPorContaContrato({
      empresaOperadora,
      contaContrato,
    });

    if (!cliente) {
      throw new AppError('Cliente não encontrado');
    }

    return cliente;
  }
}

export default BuscarClienteAPIUseCase;
