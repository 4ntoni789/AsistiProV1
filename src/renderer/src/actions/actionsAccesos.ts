import { ACTIVEMENUVERACCESOS } from "@renderer/type";
const apiUrl = import.meta.env.VITE_API_URL;


export const Fetch_accesos_dia = (userId: string) => {
    return async () => {
        try {
            const response = await fetch(`${apiUrl}/api/accesos-dia`, {
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

export const Fetch_accesos_ayer = (userId: string) => {
    return async () => {
        try {
            const response = await fetch(`${apiUrl}/api/accesos-ayer`, {
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
    }
}

export const ActiveMenuVerAccesos = (value: object) => ({ type: ACTIVEMENUVERACCESOS, value });
