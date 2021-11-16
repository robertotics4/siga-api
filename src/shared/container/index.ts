import { container } from 'tsyringe';

import IClientesTabCadastroRepository from '../../modules/clientes/repositories/IClientesTabCadastroRepository';
import ClientesTabCadastroRepository from '../../modules/clientes/repositories/implementations/ClientesTabCadastroRepository';

container.registerSingleton<IClientesTabCadastroRepository>(
  'ClientesTabCadastroRepository',
  ClientesTabCadastroRepository,
);
