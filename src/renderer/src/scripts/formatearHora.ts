export const formatearHoraLocal = (fecha) => {
    if (!(fecha instanceof Date) || isNaN(fecha.getTime())) return "";

    return fecha.toISOString().substring(11, 19); // HH:MM:SS sin cambiar la zona
}

export const formatearHoraLocal2 = (fecha) => {
    const fechaUTC = new Date(fecha);

    // convertir a hora local del navegador
    const fechaLocal = fechaUTC.toLocaleString("es-CO", {
        timeZone: "America/Bogota",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });
    return fechaLocal;
}