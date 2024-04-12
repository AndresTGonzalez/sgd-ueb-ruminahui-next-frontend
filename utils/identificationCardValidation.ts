export function validateEcuadorianID(id: string): boolean {
  if (!/^\d{10}$/.test(id)) return false; // La cédula debe tener 10 dígitos

  const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  let suma = 0;

  for (let i = 0; i < 9; i++) {
    let valor = parseInt(id.charAt(i)) * coeficientes[i];
    suma += valor >= 10 ? valor - 9 : valor;
  }

  let digitoVerificador = suma % 10 ? 10 - (suma % 10) : 0;

  return parseInt(id.charAt(9)) === digitoVerificador;
}
