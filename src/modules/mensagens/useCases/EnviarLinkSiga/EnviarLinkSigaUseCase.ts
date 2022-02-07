import { inject, injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';

import AppError from '../../../../errors/AppError';
import getRandomInt from '../../../../util/getRandomInt';
import { getTelefonesTeste } from '../../../../util/getTelefonesTeste';
import isWithinOfficeHours from '../../../../util/isWithinOfficeHours';
import prepararMensagemSiga from '../../../../util/prepararMensagemSiga';
import verificarTelefoneMaisUsado from '../../../../util/verficiarTelefoneMaisUsado';
import IClientesAPIRepository from '../../../clientes/repositories/IClientesAPIRepository';
import IClientesTabCadastroRepository from '../../../clientes/repositories/IClientesTabCadastroRepository';
import ILogsMensagensRepository from '../../../logs/repositories/ILogsMensagensRepository';
import ISolicitacoesRepository from '../../../solicitacoes/repositories/ISolicitacoesRepository';
import IMensagensRepository from '../../repositories/IMensagensRepository';

interface IRequest {
  empresaOperadora: number;
  contaContrato: string;
  codigoNota: string;
  tipoSolicitacao?: string;
  link: string;
}

interface ITelefonesParaEnvio {
  principal: string;
  secundario?: string;
}

interface IInfoSolicitacoes {
  solicitacaoEncontrada: any | undefined;
  idSessaoAtiva: string | null;
}

@injectable()
class EnviarLinkSigaUseCase {
  constructor(
    @inject('MensagensRepository')
    private mensagensRepository: IMensagensRepository,

    @inject('SolicitacoesRepository')
    private solicitacoesRepository: ISolicitacoesRepository,

    @inject('ClientesAPIRepository')
    private clientesAPIRepository: IClientesAPIRepository,

    @inject('ClientesTabCadastroRepository')
    private clientesTabCadastroRepository: IClientesTabCadastroRepository,

    @inject('LogsMensagensRepository')
    private logsMensagensRepository: ILogsMensagensRepository,
  ) {}

  async execute({
    empresaOperadora,
    contaContrato,
    codigoNota,
    tipoSolicitacao,
    link,
  }: IRequest): Promise<void> {
    const telefonesParaEnvio: ITelefonesParaEnvio = {} as ITelefonesParaEnvio;
    const infoSolicitacoes: IInfoSolicitacoes = {} as IInfoSolicitacoes;

    if (!isWithinOfficeHours()) {
      throw new AppError('Serviço indisponível neste horário');
    }

    // Buscando telefone nas solicitações
    const solicitacoes = await this.solicitacoesRepository.buscarSolicitacoes({
      empresaOperadora,
      contaContrato,
    });

    if (!solicitacoes.length) {
      // Se não encontrar nas solicitações, buscar na API de clientes
      const { telefoneMovel: telMovelAPI } =
        await this.clientesAPIRepository.buscarPorContaContrato({
          empresaOperadora,
          contaContrato,
        });

      if (telMovelAPI.length) {
        // Se encontrar na API de clientes ...
        Object.assign(telefonesParaEnvio, {
          principal: telMovelAPI[0],
          secundario: telMovelAPI[1] || undefined,
        });
      } else {
        // Se não encontrar na API de clientes, buscar na tabela de cadastro
        const { telefoneMovel: telMovelCadastro } =
          await this.clientesTabCadastroRepository.buscarPorContaContrato({
            empresaOperadora,
            contaContrato,
          });

        if (!telMovelCadastro.length) {
          throw new AppError('O cliente não possui telefones cadastrados');
        }

        Object.assign(telefonesParaEnvio, {
          principal: telMovelCadastro[0],
          secundario: telMovelCadastro[1] || undefined,
        });
      }
    } else {
      // Se existirem solicitações, filtrar pelo código da nota
      const solicitacaoEncontrada = solicitacoes.filter(
        solicitacao => solicitacao.codigoNota === codigoNota,
      )[0];

      if (solicitacaoEncontrada) {
        Object.assign(infoSolicitacoes, {
          ...infoSolicitacoes,
          solicitacaoEncontrada,
        });

        Object.assign(telefonesParaEnvio, {
          principal: solicitacaoEncontrada.telefone,
        });
      } else {
        // Se não encontrar uma solicitação baseada no código da nota, verificar o telefone mais utilizado
        const telefoneMaisUsado = verificarTelefoneMaisUsado(solicitacoes);

        Object.assign(telefonesParaEnvio, {
          principal: telefoneMaisUsado,
        });
      }

      // Verifica se existe uma sessão ativa com o cliente
      if (solicitacaoEncontrada && solicitacaoEncontrada.sessaoAtiva) {
        Object.assign(infoSolicitacoes, {
          ...infoSolicitacoes,
          idSessaoAtiva: solicitacaoEncontrada.sessao,
        });
      }
    }

    // Números utilizados durante a fase de testes
    if (process.env.TELEFONES_TESTE) {
      const telefonesTeste = getTelefonesTeste();
      const indiceRandomico = getRandomInt(0, telefonesTeste.length);

      console.log({
        telefoneTeste: telefonesTeste[indiceRandomico],
        telefoneUsuario: telefonesParaEnvio.principal,
      });

      // Envia a mensagem para o número de teste selecionado
      await this.mensagensRepository.enviarLinkSiga({
        empresaOperadora,
        telefone: telefonesTeste[indiceRandomico],
        contaContrato,
        codigoNota,
        tipoSolicitacao,
        link,
        idSessaoAtiva: infoSolicitacoes.idSessaoAtiva,
      });
    } else {
      // await this.mensagensRepository.enviarLinkSiga({
      //   empresaOperadora,
      //   telefone: telefonesParaEnvio.principal,
      //   contaContrato,
      //   codigoNota,
      //   tipoSolicitacao,
      //   link,
      //   idSessaoAtiva: infoSolicitacoes.idSessaoAtiva,
      // });
    }

    const mensagemEnviada = prepararMensagemSiga(
      tipoSolicitacao,
      codigoNota,
      'INICIAR',
      link,
    ).replace(/\*/g, '');

    await this.logsMensagensRepository.gravarLogMensagem({
      empresaOperadora,
      canal: 'whatsapp',
      sessao: infoSolicitacoes.idSessaoAtiva,
      telefone: telefonesParaEnvio.principal,
      dataEnvio: new Date(),
      idEnvio: uuidv4(),
      mensagemEnviada,
      tipoSolicitacao: `SIGA_INICIAR`,
      codigoServico: infoSolicitacoes.solicitacaoEncontrada
        ? infoSolicitacoes.solicitacaoEncontrada.codigoServico
        : undefined,
      codigoNota,
      contaContrato,
      categoria: infoSolicitacoes.idSessaoAtiva ? 'PUSH' : 'PUSH - ATIVO',
      usuario: 'teste', // HARD CODDED
      dataNota: infoSolicitacoes.solicitacaoEncontrada
        ? infoSolicitacoes.solicitacaoEncontrada.dataSolicitacao
        : undefined,
    });
  }
}

export default EnviarLinkSigaUseCase;
