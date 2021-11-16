import Cliente from '../entities/Cliente';

export interface IBuscarPorContaContratoDTO {
  empresaOperadora: number;
  contaContrato: string;
}

interface IClientesTabCadastroRepository {
  buscarPorContaContrato({
    empresaOperadora,
    contaContrato,
  }: IBuscarPorContaContratoDTO): Promise<Cliente>;
}

export default IClientesTabCadastroRepository;
