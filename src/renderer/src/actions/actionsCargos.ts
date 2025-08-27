import { ACTIVESUBMENUNEWCARGO, ACTIVESUBMENUUPDATECARGO } from "@renderer/type";
import { ActiveErrorSpam } from "./actionsLogin";
import { ActiveSubMenuDeleteUsers } from "./actionsUsers";
const apiUrl = import.meta.env.VITE_API_URL;


export const Fetch_cargos = (userId: string) => {
    return async () => {
        try {
            const response = await fetch(`${apiUrl}/api/cargos`, {
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

export const ActiveSubMenuNewCargo = (value: any) => {
    return {
        type: ACTIVESUBMENUNEWCARGO,
        value: value
    }
};

export const Fet_new_cargo = (dataInput: any, userId: string, userData: any, reset: () => void) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${apiUrl}/api/cargo`, {
                method: 'POST',
                headers: {
                    'x-id-usuario': userId,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre_cargo: dataInput.nombre_cargo,
                    reqUser: userData
                }),
            });

            const result = await response.json();
            if (response.ok) {
                dispatch(ActiveSubMenuNewCargo({ user: {}, subMenuNewCargo: false }));
                dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'submit' }));
                reset();
            } else {
                dispatch(ActiveErrorSpam({ msg: result.error, active: true, typeError: 'Error' }));
                throw new Error(result.error)
            }
        } catch (error) {
            console.error('Error:', error);
            console.log('Ocurrió un error al crear este cargo');
        }
    }
}

export const ActiveSubMenuUpdateCargo = (value: any) => {
    return {
        type: ACTIVESUBMENUUPDATECARGO,
        value: value
    }
};

export const Fetch_update_cargo = (dataInput: any, activeUpdateCargo: any, userId: string, userData: any) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${apiUrl}/api/cargo/${activeUpdateCargo.user.item.id_cargo}`, {
                method: 'PUT',
                headers: {
                    'x-id-usuario': userId,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre_cargo: dataInput.nombre_cargo,
                    reqUser: userData
                }),
            });

            const result = await response.json();
            if (response.ok) {
                dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'submit' }));
                dispatch(ActiveSubMenuUpdateCargo({ user: {}, subMenuUpdateCargo: false }));
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            dispatch(ActiveErrorSpam({ msg: 'Error al actualizar este cargo', active: true, typeError: 'Error' }));
            console.log('Ocurrió un error al actualizar este cargo');
        }
    }
}

export const Fetch_delete_cargo = (activeDeleteUsers: any, userData) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`/api/cargo/${activeDeleteUsers.user.id_cargo}`, {
                method: 'DELETE',
                headers: {
                    'x-id-usuario': userData.id_usuario,
                    'Content-Type': 'application/json'
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
            dispatch(ActiveErrorSpam({ msg: 'Error al eliminar este cargo', active: true, typeError: 'error' }));
            console.log(error)
        }
    }
}