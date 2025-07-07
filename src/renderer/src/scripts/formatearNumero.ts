export const formatearNumero = (valor, maxDigitos = 7) => {
    const limpio = valor.replace(/\D/g, '').slice(0, maxDigitos); // Solo números y máximo N dígitos
    return limpio.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Formato con puntos
};