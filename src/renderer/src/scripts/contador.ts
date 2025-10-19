// contadorSimple.ts
export const contador = (
    minutos: number,
    setMinutos: React.Dispatch<React.SetStateAction<number>>,
    setSegundos: React.Dispatch<React.SetStateAction<number>>,
    finalizar: boolean
) => {
    let tiempo = Math.max(0, minutos) * 60;
    let intervalo: number | null = null;

    // inicializa valores visibles inmediatamente
    setMinutos(Math.floor(tiempo / 60));
    setSegundos(tiempo % 60);

    if (!finalizar) {
        intervalo = window.setInterval(() => {
            tiempo = Math.max(0, tiempo - 1);
            setMinutos(Math.floor(tiempo / 60));
            setSegundos(tiempo % 60);

            if (tiempo <= 0 && intervalo !== null) {
                clearInterval(intervalo);
                intervalo = null;
            }
        }, 1000);
    }

    // devolver la función para limpiar el intervalo desde el useEffect
    return () => {
        if (intervalo !== null) {
            clearInterval(intervalo);
            intervalo = null;
        }
    };
};
