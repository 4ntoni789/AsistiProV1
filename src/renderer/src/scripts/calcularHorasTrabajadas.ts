export const calcularHorasTrabajadas = (horaInicio: string,
    horaFin: string,
    descansoInicioStr: string,
    descansoFinStr: string): string => {

    if (horaInicio != undefined && horaFin != undefined && descansoFinStr != undefined && descansoFinStr != undefined) {
        if (horaInicio != '' || horaFin != '' || descansoFinStr != '' || descansoFinStr != '') {
            const [hInicio, mInicio, sInicio] = horaInicio.split(':').map(Number);
            const [hFin, mFin, sFin] = horaFin.split(':').map(Number);
            const [hDescInicio, mDescInicio, sDescInicio] = descansoInicioStr.split(':').map(Number);
            const [hDescFin, mDescFin, sDescFin] = descansoFinStr.split(':').map(Number);

            const hoy = new Date();
            const inicio = new Date(hoy);
            inicio.setHours(hInicio, mInicio, sInicio, 0);

            const fin = new Date(hoy);
            fin.setHours(hFin, mFin, sFin, 0);
            if (fin <= inicio) {
                fin.setDate(fin.getDate() + 1); // caso turno nocturno
            }

            const descansoInicio = new Date(hoy);
            descansoInicio.setHours(hDescInicio, mDescInicio, sDescInicio, 0);

            const descansoFin = new Date(hoy);
            descansoFin.setHours(hDescFin, mDescFin, sDescFin, 0);

            if (fin.getDate() > inicio.getDate() && descansoFin <= descansoInicio) {
                descansoInicio.setDate(descansoInicio.getDate() + 1);
                descansoFin.setDate(descansoFin.getDate() + 1);
            }

            const totalMs = fin.getTime() - inicio.getTime();

            const inicioSolape = Math.max(inicio.getTime(), descansoInicio.getTime());
            const finSolape = Math.min(fin.getTime(), descansoFin.getTime());

            const descansoMs = inicioSolape < finSolape ? finSolape - inicioSolape : 0;

            const resultadoMs = totalMs - descansoMs;

            const horas = Math.floor(resultadoMs / (1000 * 60 * 60));
            const minutos = Math.floor((resultadoMs % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((resultadoMs % (1000 * 60)) / 1000);

            const pad = (n: number) => n.toString().padStart(2, '0');
            return `${pad(horas)}:${pad(minutos)}:${pad(segundos)}`;
        }
        return '00'
    }
    return '';
}
