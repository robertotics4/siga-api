import BuscarClienteTabCadastroController from './BuscarClienteTabCadastroController';
import BuscarClienteTabCadastroUseCase from './BuscarClienteTabCadastroUseCase';

const buscarClienteTabCadastroUseCase = new BuscarClienteTabCadastroUseCase();

const buscarClienteTabCadastroController =
  new BuscarClienteTabCadastroController(buscarClienteTabCadastroUseCase);

export default buscarClienteTabCadastroController;
