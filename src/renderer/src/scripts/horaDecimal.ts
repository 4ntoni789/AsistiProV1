export const horaToDecimal = (hora: string): number => {
    if (hora != undefined) {
        const [h, m] = hora.split(':').map(Number);
        return h + m / 60;
    }
    return 0
}
