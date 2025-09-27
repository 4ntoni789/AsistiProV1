import { ACTIVESUBMENUUPDATEPASS } from "@renderer/type";
import { ActiveErrorSpam } from "./actionsLogin";
import { ActiveSubMenuUpdateUsers } from "./actionsUsers";
const apiUrl = import.meta.env.VITE_API_URL;


export const ActiveSubMenuUpdatePass = (value: any) => ({ type: ACTIVESUBMENUUPDATEPASS, value });

export const Fetch_update_single_user = (dataInput: any, activeUpdateUser: any, userId: string, userData) => {
    const token = localStorage.getItem("token");
    return async (dispatch) => {
        try {
            const response = await fetch(`${apiUrl}/api/single-usuario/${activeUpdateUser.user.id_usuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-id-usuario': userId,
                    "Authorization": `Bearer ${token}`
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
            dispatch(ActiveErrorSpam({ msg: 'Error verifica los campos antes de actualizar', active: true, typeError: 'Error' }));
            console.log('Ocurrió un error al actualizar el usuario');
        }
    }
}

export const Fetch_update_pass = (dataInput: any, userData: any, reset: () => void) => {
    const token = localStorage.getItem("token");
    console.log(userData);
    return async (dispatch) => {
        const response = await fetch(`${apiUrl}/api/single-usuario-put-pass/${userData.id_usuario}`, {
            method: 'PUT',
            headers: {
                'x-id-usuario': userData.id_usuario,
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
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

