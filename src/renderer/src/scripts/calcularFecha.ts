import { parse, addMonths, format, isValid, subDays } from 'date-fns';

export function calcularFechaFinal(fechaInicioStr: string, mesesContrato: number): string {
  let fecha: Date;
  if (/^\d{2}-\d{2}-\d{4}$/.test(fechaInicioStr)) {
    fecha = parse(fechaInicioStr, 'dd-MM-yyyy', new Date());
  } else if (/^\d{4}-\d{2}-\d{2}$/.test(fechaInicioStr)) {
    fecha = parse(fechaInicioStr, 'yyyy-MM-dd', new Date());
  } else {
    console.error("Formato de fecha no reconocido");
    return '';
  }
  if (!isValid(fecha)) {
    console.error("Fecha inválida:", fecha);
    return '';
  }
  const fechaFinal = subDays(addMonths(fecha, mesesContrato), 1);
  return format(fechaFinal, 'yyyy-MM-dd');
}
