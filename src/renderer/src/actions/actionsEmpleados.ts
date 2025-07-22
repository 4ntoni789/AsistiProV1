import { capitalizarCadaPalabra } from "@renderer/scripts/upper";
import { ACTIVENEWEMPLEADO, ACTIVESUBMENUEMPLEADOS } from "@renderer/type";
import { ActiveErrorSpam } from "./actionsLogin";
import { Opcion } from "@renderer/interface";
const apiUrl = import.meta.env.VITE_API_URL;


export const ActiveSubMenuNewEmpleado = (value: any) => ({ type: ACTIVENEWEMPLEADO, value });

export const Fetch_new_empleado = (dataInput: any, userId: string, userData: any, municipio: Opcion | null, reset: () => void) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${apiUrl}/api/empleados`, {
                method: 'POST',
                headers: {
                    'x-id-usuario': userId,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre_usuario: capitalizarCadaPalabra(dataInput.nombre_usuario),
                    apellido: capitalizarCadaPalabra(dataInput.apellidos),
                    cedula: dataInput.cedula,
                    telefono: dataInput.telefono,
                    email: dataInput.email,
                    sexo: dataInput.sexo,
                    lugar_nacimiento: municipio?.label,
                    fecha_nacimiento: dataInput.fecha_nacimiento,
                    direccion: dataInput.direccion,
                    reqUser: userData
                }),
            });

            const result = await response.json();
            if (response.ok) {
                dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'submit' }));
                reset();
                dispatch(ActiveSubMenuNewEmpleado({ user: {}, activeNewEmpleado: false }))
            } else {
                throw new Error(result.error);
            }
            // console.log(result.message);
        } catch (error) {
            dispatch(ActiveErrorSpam({ msg: 'Error al crear el Empleado', active: true, typeError: 'Error' }));
            console.error('Error:', error);
            console.log('Ocurrió un error al crear el empleado');
        }
    }
}

export const ActiveSubMenuEmpleado = (value: any) => ({ type: ACTIVESUBMENUEMPLEADOS, value });

export const Fetch_empleados = (userId: string) => {
    return async () => {
        try {
            const response = await fetch(`${apiUrl}/api/empleados`, {
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

export const Fet_update_empleado = (dataInput: any, activeNewEmpleado: any, userId: string, userData: any, municipio: any, reset: () => void) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${apiUrl}/api/empleados/${activeNewEmpleado.user.id_empleado}`, {
                method: 'PUT',
                headers: {
                    'x-id-usuario': userId,
                    'Content-Type': 'application/json',
                }
                ,
                body: JSON.stringify({
                    nombres: dataInput.nombre_usuario,
                    apellidos: dataInput.apellidos,
                    cedula: dataInput.cedula,
                    telefono: dataInput.telefono,
                    correo: dataInput.email,
                    sexo: dataInput.sexo,
                    lugar_nacimiento: municipio?.label,
                    fecha_nacimiento: dataInput.fecha_nacimiento,
                    direccion: dataInput.direccion,
                    reqUser: userData
                }),
            });

            const result = await response.json();
            if (response.ok) {
                dispatch(ActiveSubMenuEmpleado({ user: {}, subMenuEmpleado: false }));
                reset();
                dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'submit' }));
            } else {
                throw new Error(result.error)
            }
        } catch (error) {
            dispatch(ActiveSubMenuEmpleado({ user: {}, subMenuEmpleado: false }));
            dispatch(ActiveErrorSpam({ msg: 'Error al actualizar el empleado', active: true, typeError: 'Error' }));
            console.log('Ocurrió un error al actualizar el empleado');
        }
    }
}