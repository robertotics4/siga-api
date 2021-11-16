import IBuscarPorContaContratoDTO from '../../dtos/IBuscarPorContaContratoDTO';
import Cliente from '../entities/Cliente';

interface IClientesAPIRepository {
  buscarPorContaContrato({
    empresaOperadora,
    contaContrato,
  }: IBuscarPorContaContratoDTO): Promise<Cliente>;
}

export default IClientesAPIRepository;
