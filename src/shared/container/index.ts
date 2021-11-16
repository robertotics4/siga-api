import { container } from 'tsyringe';

import IClientesAPIRepository from '../../modules/clientes/repositories/IClientesAPIRepository';
import IClientesTabCadastroRepository from '../../modules/clientes/repositories/IClientesTabCadastroRepository';
import ClientesAPIRepository from '../../modules/clientes/repositories/implementations/ClientesAPIRepository';
import ClientesTabCadastroRepository from '../../modules/clientes/repositories/implementations/ClientesTabCadastroRepository';

container.registerSingleton<IClientesTabCadastroRepository>(
  'ClientesTabCadastroRepository',
  ClientesTabCadastroRepository,
);

container.registerSingleton<IClientesAPIRepository>(
  'ClientesAPIRepository',
  ClientesAPIRepository,
);
