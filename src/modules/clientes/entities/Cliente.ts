import IClienteDTO from '../dtos/IClienteDTO';

class Cliente {
  constructor(data: IClienteDTO) {
    this.contaContrato = data.contaContrato;
    this.nome = data.nome;
    this.email = data.email;
    this.telefoneFixo = data.telefoneFixo;
    this.telefoneMovel = data.telefoneMovel;
  }

  contaContrato: string;

  nome: string;

  email?: string;

  telefoneFixo?: string[];

  telefoneMovel?: string[];
}

export default Cliente;
