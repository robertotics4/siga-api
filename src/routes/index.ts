import { Router } from 'express';

import clientesRotas from './clientes.routes';
import mensagensRotas from './mensagens.routes';
import solicitacoesRotas from './solicitacoes.routes';

const router = Router();

router.use('/solicitacoes', solicitacoesRotas);
router.use('/mensagens', mensagensRotas);
router.use('/clientes', clientesRotas);

export default router;
