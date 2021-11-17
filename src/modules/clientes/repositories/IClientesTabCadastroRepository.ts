import IBuscarPorContaContratoDTO from '../dtos/IBuscarPorContaContratoDTO';
import Cliente from '../entities/Cliente';

interface IClientesTabCadastroRepository {
  buscarPorContaContrato({
    empresaOperadora,
    contaContrato,
  }: IBuscarPorContaContratoDTO): Promise<Cliente>;
}

export default IClientesTabCadastroRepository;
