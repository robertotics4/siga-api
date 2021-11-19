import { container } from 'tsyringe';

import IClientesAPIRepository from '../../modules/clientes/repositories/IClientesAPIRepository';
import IClientesTabCadastroRepository from '../../modules/clientes/repositories/IClientesTabCadastroRepository';
import ClientesAPIRepository from '../../modules/clientes/repositories/implementations/ClientesAPIRepository';
import ClientesTabCadastroRepository from '../../modules/clientes/repositories/implementations/ClientesTabCadastroRepository';
import ILogsMensagensRepository from '../../modules/logs/repositories/ILogsMensagensRepository';
import LogsMensagensRepository from '../../modules/logs/repositories/implementations/LogsMensagensRepository';
import IMensagensRepository from '../../modules/mensagens/repositories/IMensagensRepository';
import MensagensRepository from '../../modules/mensagens/repositories/implementations/MensagensRepository';
import SolicitacoesRepository from '../../modules/solicitacoes/repositories/implementations/SolicitacoesRepository';
import ISolicitacoesRepository from '../../modules/solicitacoes/repositories/ISolicitacoesRepository';

container.registerSingleton<IClientesTabCadastroRepository>(
  'ClientesTabCadastroRepository',
  ClientesTabCadastroRepository,
);

container.registerSingleton<IClientesAPIRepository>(
  'ClientesAPIRepository',
  ClientesAPIRepository,
);

container.registerSingleton<ISolicitacoesRepository>(
  'SolicitacoesRepository',
  SolicitacoesRepository,
);

container.registerSingleton<IMensagensRepository>(
  'MensagensRepository',
  MensagensRepository,
);

container.registerSingleton<ILogsMensagensRepository>(
  'LogsMensagensRepository',
  LogsMensagensRepository,
);
