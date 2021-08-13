function completarComZeros(numero: string, tamanho: number): string {
  let numeroFormatado = numero.toString();
  let contador = numeroFormatado.length;

  while (contador < tamanho) {
    numeroFormatado = `0${numeroFormatado}`;

    contador += 1;
  }

  return numeroFormatado;
}

export default completarComZeros;
