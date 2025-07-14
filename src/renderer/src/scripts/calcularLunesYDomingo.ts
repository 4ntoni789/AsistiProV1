export const obtenerSemanaSiEsLunes = (fechaInput) => {
    // Convertimos la fecha 'YYYY-MM-DD' en año, mes y día
    const [año, mes, dia] = fechaInput.split('-').map(Number);

    // Creamos fecha local (mes va de 0 a 11)
    const fecha = new Date(año, mes - 1, dia);

    if (fecha.getDay() !== 1) return null; // 1 = lunes

    const lunes = new Date(fecha);
    const domingo = new Date(fecha);
    domingo.setDate(lunes.getDate() + 6);

    const formato = (f) => f.toISOString().split('T')[0];

    return {
        lunes: formato(lunes),
        domingo: formato(domingo)
    };
}
