import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import prepararStringContaContrato from '../../../../util/prepararStringContaContrato';
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
    const strContaContrato = prepararStringContaContrato(
      empresaOperadora,
      contaContrato,
    );

    const response = await axios.get(
      `${process.env.URL_API_CANAIS_DIGITAIS}/atendimento/v1/clientes`,
      {
        params: {
          empresaOperadora,
          contrato: strContaContrato,
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
        : null;

    const telefoneFixo = telefones.filter(telefone => telefone.tipo === 'FIXO');
    const telefoneMovel = telefones.filter(
      telefone => telefone.tipo === 'MOVEL',
    );

    const cliente = new Cliente({
      contaContrato: strContaContrato,
      nome: responseClient.sobrenome
        ? `${responseClient.nome} ${responseClient.sobrenome}`
        : responseClient.nome,
      telefoneFixo: telefoneFixo.length
        ? telefoneFixo.map(telefone => telefone.numero)
        : [],
      telefoneMovel: telefoneMovel.length
        ? telefoneMovel.map(telefone => telefone.numero)
        : [],
      email,
    });

    return cliente;
  }
}

export default ClientesAPIRepository;
