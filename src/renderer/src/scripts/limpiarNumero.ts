export const limpiarNumero = (valor: string): number => {
  return Number(valor.replace(/\./g, ''));
};