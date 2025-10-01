import { ActiveErrorSpam } from "./actionsLogin";

const apiUrl = import.meta.env.VITE_API_URL;

export const Fetch_configuracion_notificaciones = (userId: string) => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
        const { loginAccess } = getState();
        const conexionSse = loginAccess.conexionSse;
        if (conexionSse) {
            try {
                const response = await fetch(`${apiUrl}/api/configuracion-notificaciones`, {
                    headers: {
                        'x-id-usuario': userId,
                        "Authorization": `Bearer ${token}`
                    }
                });

                const result = await response.json();

                if (response.ok) {
                    return result;
                } else {
                    console.error('Error al traer la configuracion:', result);
                    return null;
                }
            } catch (error) {
                console.error('Error al hacer la petición:', error);
                return null;
            }
        }
    }
}


export const Fet_new_configuracion_notificaciones = (dataInput: any, userId: string, userData: any) => {
    const token = localStorage.getItem("token");
    return async (dispatch) => {
        const modificador = `${userId}-${new Date}`;

        try {
            const response = await fetch(`${apiUrl}/api/new-configuracion-notificaciones`, {
                method: 'POST',
                headers: {
                    'x-id-usuario': userId,
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    envio_correo_electronico: 1,
                    correo_electronico: 'elkinram0113@icloud.com,rrhh@kikoswilly.net',
                    aviso_contratos: 1,
                    aviso_horas_contratos: '8:20-PM',
                    aviso_dias_contratos: 45,
                    usuario_modificador: modificador,
                    reqUser: userData
                }),
            });

            const result = await response.json();
            if (response.ok) {
                dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'submit' }));
            } else {
                dispatch(ActiveErrorSpam({ msg: result.error, active: true, typeError: 'Error' }));
                throw new Error(result.error)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}