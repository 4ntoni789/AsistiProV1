export const obtenerRangoDelMesSiEsPrimerDia = (fechaInput) => {
  // Parseamos la fecha como fecha local para evitar errores de zona horaria
  const [año, mes, dia] = fechaInput.split('-').map(Number);
  const fecha = new Date(año, mes - 1, dia);

  // Solo procede si es el primer día del mes
  if (fecha.getDate() !== 1) return null;

  const primerDia = new Date(año, mes - 1, 1);

  // Día 0 del mes siguiente = último día del mes actual
  const ultimoDia = new Date(año, mes, 0);

  // Formateamos en formato YYYY-MM-DD
  const formato = (f) => f.toISOString().split('T')[0];

  return {
    inicioMes: formato(primerDia),
    finMes: formato(ultimoDia)
  };
}
