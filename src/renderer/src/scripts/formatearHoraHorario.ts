export const formatearHoraHorario = (fechaISO: string): string => {
    const fecha = new Date(fechaISO);

    // Ajustar al horario local si es necesario
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');

    return `${horas}:${minutos}:00`;
}
