
export const ordenarPorNombre = (lista) => {
    if (lista) {
        return [...lista].sort((a, b) =>
            a.nombres.localeCompare(b.nombres, 'es', { sensitivity: 'base' })
        );
    }
    return []
};