import { ACTIVEDARKMODE, ACTIVEERRORSPAM, ERRORLOGIN, LOGOUT, SUBMITLOGIN } from "@renderer/type";
const apiUrl = import.meta.env.VITE_API_URL;

export const SubmitLogin = (value: object) => {
    return {
        type: SUBMITLOGIN,
        value: value
    }
};
export const ErrorLogin = (value: boolean) => {
    return {
        type: ERRORLOGIN,
        value: value
    }
};
export const Logout = () => {
    return {
        type: LOGOUT
    }
};

export const ValidationData = (dataInput: { nombre_usuario: string; contrasena: string }, reset: () => void) => {
    return async (dispatch) => {
        dispatch(ErrorLogin(false));
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
                dispatch(SubmitLogin(result.user));
                reset();
            } else {
                dispatch(ErrorLogin(true));
            }
        } catch (error) {
            console.error('Error:', error);
            dispatch(ErrorLogin(true));
        }
    };
};

export const ActiveErrorSpam = (value: any) => ({ type: ACTIVEERRORSPAM, value })

export const ActiveDarkMode = (value: boolean) => ({ type: ACTIVEDARKMODE, value });
