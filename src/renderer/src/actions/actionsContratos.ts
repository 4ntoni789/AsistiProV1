const apiUrl = import.meta.env.VITE_API_URL;

export const Fetch_contratos = (userId) => {
    return async () => {
        try {
            const response = await fetch(`${apiUrl}/api/contratos`, {
                method: 'GET',
                headers: {
                    'x-id-usuario': userId
                }
            });

            const result = await response.json();

            if (response.ok) {
                return result;
            } else {
                console.error('Error en la petición:', result);
                return null;
            }
        } catch (error) {
            console.error('Error al hacer la petición:', error);
            return null;
        }
    };
}