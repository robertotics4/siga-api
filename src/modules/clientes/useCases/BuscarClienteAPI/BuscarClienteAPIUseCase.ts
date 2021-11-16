import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import AppError from '../../../../errors/AppError';
import completarComZeros from '../../../../util/completarComZeros';
import obterEmpresaPorCodigoOperadora from '../../../../util/obterEmpresaPorCodigoOperadora';
import Cliente from '../../entities/Cliente';

interface IRequest {
  empresaOperadora: number;
  contaContrato: string;
}

class BuscarClienteAPIUseCase {
  async execute({ empresaOperadora, contaContrato }: IRequest): Promise<void> {
    const empresa = obterEmpresaPorCodigoOperadora(empresaOperadora);

    if (!empresa) {
      throw new AppError('Código de empresa operadora inválido');
    }

    if (!contaContrato) {
      throw new AppError('A conta contrato é obrigatória');
    }

    const response = await axios.get(process.env.URL_API_CANAIS_DIGITAIS, {
      params: {
        empresaOperadora,
        contrato: completarComZeros(contaContrato, 12),
        codigoTransacao: uuidv4(),
        flagDadosCliente: true,
      },
    });

    const responseClient = response.data.data.cliente[0];

    // const cliente = new Cliente({
    //   contaContrato: responseClient.contaContrato,
    //   nome: responseClient.nome + responseClient.sobrenome,
    //   email: responseClient.
    // });
  }
}

export default BuscarClienteAPIUseCase;
