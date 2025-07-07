export const formatearFecha = (fechaStr) => {
    const meses = [
        "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
        "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
    ];

    const fecha = new Date(fechaStr);

    const dia = fecha.getDate() + 1;
    const mes = meses[fecha.getMonth()];
    const año = fecha.getFullYear();

    return `${dia} DE ${mes} DEL ${año}`;
}