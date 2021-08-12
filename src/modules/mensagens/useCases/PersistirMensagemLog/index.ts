import PersistirMensagemLogController from './PersistirMensagemLogController';
import PersistirMensagemLogUseCase from './PersistirMensagemLogUseCase';

const persistirMensagemLogUseCase = new PersistirMensagemLogUseCase();

const persistirMensagemLogController = new PersistirMensagemLogController(
  persistirMensagemLogUseCase,
);

export default persistirMensagemLogController;
