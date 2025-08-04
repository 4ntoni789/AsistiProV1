export const decimalToHora = (decimal: number): string => {
    const horas = Math.floor(decimal);
    const minutos = Math.round((decimal - horas) * 60);

    const horasStr = horas.toString().padStart(2, '0');
    const minutosStr = minutos.toString().padStart(2, '0');

    return `${horasStr}:${minutosStr}:00`;
};