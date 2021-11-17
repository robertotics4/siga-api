function completarComZeros(str: string, tamanho: number): string {
  let numeroFormatado = str.toString();
  let contador = numeroFormatado.length;

  while (contador < tamanho) {
    numeroFormatado = `0${numeroFormatado}`;

    contador += 1;
  }

  return numeroFormatado;
}

export default completarComZeros;
