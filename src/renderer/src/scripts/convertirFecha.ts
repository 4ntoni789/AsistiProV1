export const formatearFecha = (fechaStr: string): string => {
    const meses = [
        "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
        "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
    ];

    // dividir el string YYYY-MM-DD
    const [año, mes, dia] = fechaStr.split("-").map(Number);

    return `${dia} DE ${meses[mes - 1]} DEL ${año}`;
};
