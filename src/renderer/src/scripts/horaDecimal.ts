export const horaToDecimal = (hora: string): number => {
    const [h, m] = hora.split(':').map(Number);
    return h + m / 60;
}
