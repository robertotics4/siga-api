import completarComZeros from './completarComZeros';
import removerZerosAEsquerda from './removerZerosAEsquerda';

function prepararStringContaContrato(
  empresaOperadora: number,
  contaContrato: string,
): string {
  if (empresaOperadora === 95 || empresaOperadora === 98) {
    return completarComZeros(contaContrato, 12);
  }

  if (empresaOperadora === 82 || empresaOperadora === 86) {
    return removerZerosAEsquerda(contaContrato);
  }

  return contaContrato;
}

export default prepararStringContaContrato;
