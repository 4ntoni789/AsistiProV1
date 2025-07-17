export function tiempoTranscurrido(fechaStr: string, horaStr: string): string {
  const [dia, mes, anio] = fechaStr.split('/').map(Number);
  const [horas, minutos, segundos] = horaStr.split(':').map(Number);

  const fecha = new Date(anio, mes - 1, dia, horas, minutos, segundos);
  const ahora = new Date();

  const diffMs = ahora.getTime() - fecha.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 60) {
    return `${diffSec} sec${diffSec !== 1 ? 's' : ''}`;
  }

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) {
    return `${diffMin} min${diffMin !== 1 ? 's' : ''}`;
  }

  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) {
    return `${diffHr} hr${diffHr !== 1 ? 's' : ''}`;
  }

  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay} day${diffDay !== 1 ? 's' : ''}`;
}
