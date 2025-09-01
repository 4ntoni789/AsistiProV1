import { ACTIVESUBMENUNUEWPUNTOVENTA, ACTIVESUBMENUPUNTOVENTA, ACTIVESUBMENUUPDATEPUNTOVENTA } from "@renderer/type";
import { ActiveErrorSpam } from "./actionsLogin";
import { ActiveSubMenuDeleteUsers } from "./actionsUsers";
const apiUrl = import.meta.env.VITE_API_URL;

export const Fetch_Punto_venta = (userId: string) => {
    const token = localStorage.getItem("token");
    return async () => {
        try {
            const response = await fetch(`${apiUrl}/api/puntos-venta`, {
                headers: {
                    'x-id-usuario': userId,
                    "Authorization": `Bearer ${token}`
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

export const ActiveSubMenuNewPuntoVenta = (value: any) => ({ type: ACTIVESUBMENUNUEWPUNTOVENTA, value });

export const Fetch_new_punto_venta = (dataInput: any, userId: string, userData: any, reset: () => void) => {
    const token = localStorage.getItem("token");
    return async (dispatch) => {
        try {
            const response = await fetch(`${apiUrl}/api/punto-venta`, {
                method: 'POST',
                headers: {
                    'x-id-usuario': userId,
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    nombre: dataInput.nombre,
                    direccion: dataInput.direccion,
                    numero_serie_dispositivo: dataInput.numero_serie_dispositivo,
                    reqUser: userData
                }),
            });

            const result = await response.json();
            if (response.ok) {
                dispatch(ActiveSubMenuNewPuntoVenta({ user: {}, subMenuNewPuntoVenta: false }));
                dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'submit' }));
                reset();
            } else {
                dispatch(ActiveErrorSpam({ msg: result.error, active: true, typeError: 'Error' }));
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Error:', error);
            console.log('Ocurrió un error al crear el empleado');
        }
    }
}

export const ActiveSubMenuUpdatePuntoVenta = (value: any) => ({ type: ACTIVESUBMENUUPDATEPUNTOVENTA, value });

export const Fetch_update_punto_venta = (dataInput: any, activeUpdatePuntoVenta: any, userId: string, userData: any) => {
    const token = localStorage.getItem("token");
    return async (dispatch) => {
        try {
            const response = await fetch(`${apiUrl}/api/punto-venta/${activeUpdatePuntoVenta.user.id_pv}`, {
                method: 'PUT',
                headers: {
                    'x-id-usuario': userId,
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    nombre: dataInput.nombre,
                    direccion: dataInput.direccion,
                    numero_serie_dispositivo: dataInput.numero_serie_dispositivo,
                    reqUser: userData
                }),
            });
            const result = await response.json();
            if (response.ok) {
                dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'submit' }));
                dispatch(ActiveSubMenuUpdatePuntoVenta({ user: {}, subMenuUpdatePuntoVenta: false }))
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            dispatch(ActiveErrorSpam({ msg: 'Error al actualizar este punto de venta', active: true, typeError: 'Error' }));
            console.log('Ocurrió un error al actualizar este punto de venta');
        }
    }

}

export const ActiveSubMenuPuntoVenta = (value: any) => ({ type: ACTIVESUBMENUPUNTOVENTA, value });

export const Fetch_delete_punto_venta = (activeDeleteUsers: any, userData: any) => {
    const token = localStorage.getItem("token");
    return async (dispatch) => {
        try {
            const response = await fetch(`${apiUrl}/api/punto-venta/${activeDeleteUsers.user.id_pv}`, {
                method: 'DELETE',
                headers: {
                    'x-id-usuario': userData.id_usuario,
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    reqUser: userData
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data) {
                        dispatch(ActiveErrorSpam({ msg: data.message, active: true, typeError: 'submit' }));
                        dispatch(ActiveSubMenuDeleteUsers({
                            user: {},
                            activeDeleteUsers: false
                        }))
                    } else {
                        dispatch(ActiveErrorSpam({ msg: data.message, active: true, typeError: 'error' }));
                        dispatch(ActiveSubMenuDeleteUsers({
                            user: {},
                            activeDeleteUsers: false
                        }))
                    }
                })
                .catch((err) => console.log('Error:', err));
        } catch (error) {
            dispatch(ActiveErrorSpam({ msg: 'Error al eliminar este Punto de venta', active: true, typeError: 'error' }));
            console.log(error)
        }
    }
}