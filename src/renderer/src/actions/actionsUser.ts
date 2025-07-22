import { ACTIVESUBMENUUPDATEPASS } from "@renderer/type";
import { ActiveErrorSpam } from "./actionsLogin";
import { ActiveSubMenuUpdateUsers } from "./actionsUsers";
const apiUrl = import.meta.env.VITE_API_URL;


export const ActiveSubMenuUpdatePass = (value: any) => ({ type: ACTIVESUBMENUUPDATEPASS, value });

export const Fetch_update_single_user = (dataInput: any, activeUpdateUser: any, userId: string, userData) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${apiUrl}/api/single-usuario/${activeUpdateUser.user.id_usuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-id-usuario': userId
                },
                body: JSON.stringify({
                    nombre_usuario: dataInput.nombre_usuario,
                    email: dataInput.email,
                    reqUser: userData
                }),
            });

            const result = await response.json();
            if (response.ok) {
                dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'submit' }));
                dispatch(ActiveSubMenuUpdateUsers({ user: {}, subMenuUpdateUser: false }));
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            dispatch(ActiveErrorSpam({ msg: 'Error al actualizar el usuario', active: true, typeError: 'Error' }));
            console.log('Ocurrió un error al actualizar el usuario');
        }
    }
}

export const Fetch_update_pass = (dataInput: any, userId: string, userData: any, activeUpdateUser: any, reset: () => void) => {
    return async (dispatch) => {
        const response = await fetch(`${apiUrl}/api/single-usuario-put-pass/${activeUpdateUser.user.id_usuario}`, {
            method: 'PUT',
            headers: {
                'x-id-usuario': userId,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: dataInput.contrasena,
                reqUser: userData
            }),
        });

        const result = await response.json();
        if (response.ok) {
            dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'submit' }));
            dispatch(ActiveSubMenuUpdatePass({ user: {}, subMenuUpdatePass: false }));
            reset()
            return {
                activeError: false,
                typeError: ''
            };
        } else {
            return {
                activeError: true,
                typeError: result.message
            };

        }
    }
}
