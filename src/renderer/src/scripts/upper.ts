export const capitalizarCadaPalabra = (texto) => {
    return texto
        .toLowerCase()
        .split(' ')
        .filter(p => p.trim() !== '')
        .map(p => p.charAt(0).toUpperCase() + p.slice(1))
        .join(' ');
}
