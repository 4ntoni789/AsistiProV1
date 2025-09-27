import { ACTIVEDARKMODE, ACTIVEERRORSPAM, ERRORLOGIN, LOADINGLOGIN, LOGOUT, STATECONEXIONSSE, SUBMITLOGIN } from "@renderer/type";
import { ObservadorDeNotificaciones } from "./actionsNotificacion";
const apiUrl = import.meta.env.VITE_API_URL;

export const SubmitLogin = (value: object) => {
    return {
        type: SUBMITLOGIN,
        value: value
    }
}

export const LoadingLogin = (value: boolean) => {
    return {
        type: LOADINGLOGIN,
        value: value
    }
}

export const ErrorLogin = (value: boolean) => {
    return {
        type: ERRORLOGIN,
        value: value
    }
};
export const Logout = () => {
    localStorage.removeItem("token");
    return {
        type: LOGOUT
    }
};

export const ValidationData = (
    dataInput: { nombre_usuario: string; contrasena: string },
    reset: () => void
) => {
    return async (dispatch, getState) => {
        const { loginAccess } = getState();
        const conexionSse = loginAccess.conexionSse;
        if (!conexionSse) {
            dispatch(ErrorLogin(false));
            dispatch(LoadingLogin(true));
            try {
                const response = await fetch(`${apiUrl}/api/validation`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nombre_usuario: dataInput.nombre_usuario,
                        contrasena: dataInput.contrasena,
                    }),
                });

                const result = await response.json();

                if (result.success) {
                    // ✅ Guardamos el token en localStorage
                    localStorage.setItem("token", result.token);
                    dispatch(StateConexion(true));
                    // ✅ Guardamos también los datos del usuario en Redux
                    dispatch(SubmitLogin(result.user));

                    reset();
                    dispatch(LoadingLogin(false));
                } else {
                    dispatch(LoadingLogin(false));
                    dispatch(ErrorLogin(true));
                }
            } catch (error) {
                dispatch(LoadingLogin(false));
                console.error('Error:', error);
                dispatch(ErrorLogin(true));
            }
        };
    }
};

export const ActiveErrorSpam = (value: any) => ({ type: ACTIVEERRORSPAM, value })

export const ActiveDarkMode = (value: boolean) => ({ type: ACTIVEDARKMODE, value });

export const ValidarToken = () => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
        const { loginAccess } = getState();
        const conexionSse = loginAccess.conexionSse;
        if (!conexionSse && token) {
            try {
                const response = await fetch(`${apiUrl}/api/validar-token`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const result = await response.json();

                if (result.success) {
                    dispatch(SubmitLogin(result.user));
                    dispatch(StateConexion(true));
                } else {
                    // Token inválido o expirado
                    dispatch(Logout());
                }
            } catch (err) {
                console.error("Error validando token:", err);
                // dispatch(Logout());
            }
        }
    }
};
export const StateConexion = (value: boolean) => ({ type: STATECONEXIONSSE, value });

export const DesconetarSse = (sseRef) => {
    return (dispatch) => {
        if (sseRef.current) {
            console.log("🔴 Cerrando conexión SSE...");
            sseRef.current.close();
            sseRef.current = null;
            dispatch(StateConexion(false));
        }
    }
}

export const Reconexion = (sseRef) => {
    const token = localStorage.getItem("token");
    return (dispatch, getState) => {
        const { loginAccess } = getState();
        const conexionSse = loginAccess.conexionSse;
        if (!conexionSse && token && sseRef.current == null) {
            console.warn('Intentando reconexion...');
            dispatch(ValidarToken());
        } else {
            if (!token) {
                dispatch(Logout());
            }
        }
    }
}

export const ConnectSse = (userId: string, sseRef: any) => {
    const token = localStorage.getItem("token");

    return async (dispatch, getState) => {
        const source = new EventSource(
            `${apiUrl}/api/eventos-login?id_usuario=${userId}&token=${token}`
        );
        let lastPing = Date.now();
        sseRef.current = source;
        // 🔹 Observa si hay conexion 
        source.addEventListener("ping", (event) => {
            const { ts } = JSON.parse(event.data);
            lastPing = Date.now();
            const { loginAccess } = getState();
            const conexionSse = loginAccess.conexionSse;
            if (ts && !conexionSse) {
                dispatch(StateConexion(true));
            }
        });
        // 🔹notificaciones personalizadas
        dispatch(ObservadorDeNotificaciones(source));

        // 🔹 Manejo de errores
        source.onerror = () => {
            dispatch(DesconetarSse(sseRef));
        };
    }
};