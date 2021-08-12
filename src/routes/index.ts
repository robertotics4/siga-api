import { Router } from 'express';

import solicitacoesRotas from './solicitacoes.routes';

const router = Router();

router.use(solicitacoesRotas);

export default router;
