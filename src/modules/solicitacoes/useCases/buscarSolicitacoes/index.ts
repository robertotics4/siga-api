import BuscarSolicitacoesController from './BuscarSolicitacoesController';
import BuscarSolicitacoesUseCase from './BuscarSolicitacoesUseCase';

const buscarSolicitacoesUseCase = new BuscarSolicitacoesUseCase();

const buscarSolicitacoesController = new BuscarSolicitacoesController(
  buscarSolicitacoesUseCase,
);

export default buscarSolicitacoesController;
