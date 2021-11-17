interface IClienteDTO {
  contaContrato: string;
  nome: string;
  email?: string;
  telefoneFixo?: string[];
  telefoneMovel?: string[];
}

export default IClienteDTO;
