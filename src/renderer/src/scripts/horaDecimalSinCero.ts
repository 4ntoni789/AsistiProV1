export const horaToDecimalSinCero = (hora): any => {
    if (hora != undefined) {
        const [h, m] = hora.split(':').map(Number);
        return h + m / 60;
    }
    return null
}