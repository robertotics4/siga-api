import { Router } from 'express';

import mensagensRotas from './mensagens.routes';
import solicitacoesRotas from './solicitacoes.routes';

const router = Router();

router.use('/solicitacoes', solicitacoesRotas);
router.use('/mensagens', mensagensRotas);

export default router;
