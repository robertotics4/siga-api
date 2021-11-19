import { Router } from 'express';

import clientesRotas from './clientes.routes';
import logsRotas from './logs.routes';
import mensagensRotas from './mensagens.routes';
import solicitacoesRotas from './solicitacoes.routes';

const router = Router();

router.use('/solicitacoes', solicitacoesRotas);
router.use('/mensagens', mensagensRotas);
router.use('/clientes', clientesRotas);
router.use('/logs', logsRotas);

export default router;
