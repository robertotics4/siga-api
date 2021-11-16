import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import completarComZeros from '../../../../util/completarComZeros';
import IBuscarPorContaContratoDTO from '../../../dtos/IBuscarPorContaContratoDTO';
import Cliente from '../../entities/Cliente';

interface ITelefone {
  tipo: 'FIXO' | 'MOVEL';
  numero: string;
}

class ClientesAPIRepository {
  async buscarPorContaContrato({
    empresaOperadora,
    contaContrato,
  }: IBuscarPorContaContratoDTO): Promise<Cliente> {
    const response = await axios.get(
      `${process.env.URL_API_CANAIS_DIGITAIS}/atendimento/v1/clientes`,
      {
        params: {
          empresaOperadora,
          contrato: completarComZeros(contaContrato, 12),
          codigoTransacao: uuidv4(),
          flagDadosCliente: true,
        },
      },
    );

    const responseClient = response.data.data.cliente[0];

    if (!responseClient) {
      return undefined;
    }

    const telefones: ITelefone[] = [];

    if (empresaOperadora === 95 || empresaOperadora === 98) {
      responseClient.contatos.telefones.forEach(telefone =>
        telefones.push({
          tipo: 'MOVEL',
          numero: telefone.numeroTelefone,
        }),
      );
    } else if (empresaOperadora === 82 || empresaOperadora === 86) {
      responseClient.contatos.telefones.forEach(telefone =>
        telefones.push({
          tipo: telefone.tipoTelefone === 'R' ? 'FIXO' : 'MOVEL',
          numero: telefone.numeroTelefone,
        }),
      );
    }

    const email =
      responseClient.contatos.email !== undefined
        ? responseClient.contatos.email
        : undefined;

    const cliente = new Cliente({
      contaContrato: responseClient.contaContrato,
      nome: responseClient.sobrenome
        ? responseClient.nome + responseClient.sobrenome
        : responseClient.nome,
      email,
      telefoneFixo: telefones.map(telefone =>
        telefone.tipo === 'FIXO' ? telefone.numero : undefined,
      ),
      telefoneMovel: telefones.map(telefone =>
        telefone.tipo === 'MOVEL' ? telefone.numero : undefined,
      ),
    });

    return cliente;
  }
}

export default ClientesAPIRepository;
