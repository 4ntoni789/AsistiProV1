import { ACTIVEDELETEUSER, ACTIVEREGISTERNEWUSER, ACTIVEUPDATEUSER } from "@renderer/type";
import { ActiveErrorSpam } from "./actionsLogin";
const apiUrl = import.meta.env.VITE_API_URL;

export const ActiveSubMenuNewUsers = (value: any) => {
    return {
        type: ACTIVEREGISTERNEWUSER,
        value: value
    }
};

export const Fetch_new_user = (dataInput: any, userId: string, userData, userActiveCheck: string, reset: () => void) => {
    const token = localStorage.getItem("token");
    return async (dispatch: any): Promise<{ activeError: boolean; typeError: string } | undefined> => {
        dispatch(ActiveSubMenuNewUsers({
            loading: true
        }))
        try {
            const response = await fetch(`${apiUrl}/api/usuarios`, {
                method: 'POST',
                headers: {
                    'x-id-usuario': userId,
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
                ,
                body: JSON.stringify({
                    nombre_usuario: dataInput.nombre_usuario,
                    password: dataInput.contrasena,
                    id_rol: dataInput.id_rol,
                    estado: userActiveCheck,
                    email: dataInput.email,
                    reqUser: userData
                }),
            });

            const result = await response.json();
            if (response.ok) {
                dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'submit' }));
                reset();
                dispatch(ActiveSubMenuNewUsers({
                    subMenuNewUsers: false,
                    loading: false
                }))
                return {
                    activeError: false,
                    typeError: ''
                }
            } else {
                const dato: {
                    activeError: boolean,
                    typeError: string
                } = {
                    activeError: true,
                    typeError: result.message
                }
                dispatch(ActiveSubMenuNewUsers({
                    subMenuNewUsers: true,
                    loading: false
                }))
                return dato
            }
        } catch (error) {
            console.error('Error:', error);
            console.log('Ocurrió un error al crear el usuario');
        }
    }
}

export const ActiveSubMenuUpdateUsers = (value: any) => {
    return {
        type: ACTIVEUPDATEUSER,
        value: value
    }
};

export const Fetch_update_user = (dataInput: any, userData: any, activeUpdateUser: any, userId: string) => {
    const token = localStorage.getItem("token");
    return async (dispatch) => {
        try {
            const response = await fetch(`${apiUrl}/api/usuarios/${activeUpdateUser.user.id_usuario}`, {
                method: 'PUT',
                headers: {
                    'x-id-usuario': userId,
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    nombre_usuario: dataInput.nombre_usuario,
                    id_rol: dataInput.id_rol,
                    email: dataInput.email,
                    reqUser: userData
                }),
            });

            const result = await response.json();
            if (response.ok) {
                dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'submit' }));
                dispatch(ActiveSubMenuUpdateUsers({ user: {}, subMenuUpdateUser: false }));
            } else {
                throw new Error(result.error)
            }
        } catch (error) {
            dispatch(ActiveErrorSpam({ msg: 'Error al actualizar el usuario', active: true, typeError: 'Error' }));
            console.log('Ocurrió un error al actualizar el usuario');
        }
    }
}

export const Fetch_activate_user = (userId: string, estado: { id_usuario: number }, userData: any, btnActive: boolean) => {
    const token = localStorage.getItem("token");
    return async (dispatch) => {
        try {
            const response = await fetch(`${apiUrl}/api/usuarios-active/${estado.id_usuario}`, {
                method: 'PUT',
                headers: {
                    'x-id-usuario': userId,
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    estado: btnActive == true ? 'inactivo' : 'activo',
                    reqUser: userData
                }),
            });

            const result = await response.json();
            if (response.ok) {
                if (!btnActive) {
                    dispatch(ActiveErrorSpam({ msg: `Usuario ${!btnActive ? 'activo' : 'inactivo'}`, active: true, typeError: 'submit' }))

                } else {
                    dispatch(ActiveErrorSpam({ msg: `Usuario ${!btnActive ? 'activo' : 'inactivo'}`, active: true, typeError: 'error' }))
                }
            } else {
                throw new Error(result.error)
            }

        } catch (error) {
            dispatch(ActiveErrorSpam({ msg: `Ocurrió un error al activar el usuario`, active: true, typeError: 'error' }))
        }
    }
}

export const ActiveSubMenuDeleteUsers = (value: any) => {
    return {
        type: ACTIVEDELETEUSER,
        value: value
    }
};

export const Fetch_user = (userId: string) => {
    const token = localStorage.getItem("token");
    return async () => {
        try {
            const response = await fetch(`${apiUrl}/api/usuarios`, {
                method: 'GET',
                headers: {
                    'x-id-usuario': userId,
                    "Authorization": `Bearer ${token}`
                }
            });
            const result = await response.json();
            const userFilter = result.filter((user) => user.id_usuario != userId);

            if (response.ok) {
                return userFilter;
            } else {
                console.error('Error en la petición:', result);
                return null;
            }
        } catch (error) {
            console.error('Error al hacer la petición:', error);
            return null;
        }
    };
};

export const Fetch_delete_user = (activeDeleteUsers: any, userData: any) => {
    const token = localStorage.getItem("token");
    return async (dispatch) => {
        try {
            await fetch(`${apiUrl}/api/usuarios/${activeDeleteUsers.user.id_usuario}`, {
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
            dispatch(ActiveErrorSpam({ msg: 'Error al eliminar ese usuario', active: true, typeError: 'error' }));
            console.log(error)
        }
    }
}