interface IClienteDTO {
  empresa: string;
  instalacao: string;
  contrato: string;
  contaContrato: string;
  parceiroNegocio: string;
  nome: string;
  cpf?: string;
  cnpj?: string;
  email?: string;
  telefoneFixo?: string;
  telefoneMovel?: string;
}

class Cliente {
  constructor(data: IClienteDTO) {
    this.empresa = data.empresa;
    this.instalacao = data.instalacao;
    this.contrato = data.contrato;
    this.contaContrato = data.contaContrato;
    this.parceiroNegocio = data.parceiroNegocio;
    this.nome = data.nome;
    this.cpf = data.cpf;
    this.cnpj = data.cnpj;
    this.email = data.email;
    this.telefoneFixo = data.telefoneFixo;
    this.telefoneMovel = data.telefoneMovel;
  }

  empresa: string;

  instalacao: string;

  contrato: string;

  contaContrato: string;

  parceiroNegocio: string;

  nome: string;

  cpf?: string;

  cnpj?: string;

  email?: string;

  telefoneFixo?: string;

  telefoneMovel?: string;
}

export default Cliente;
