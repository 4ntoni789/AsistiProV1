export const convertirEnPunto = (text: string) => {
    if (text.length <= 20) return text;
    const extraChars = text.length - 20;
    const puntos = ''.repeat(extraChars);
    const visible = text.slice(0, 20);

    return visible + puntos;
}