import { limpiarNumero } from "@renderer/scripts/limpiarNumero";
import { ActiveSubMenuEmpleado } from "./actionsEmpleados";
import { ActiveErrorSpam } from "./actionsLogin";
import { formatearNumero } from "@renderer/scripts/formatearNumero";
import { formatearFecha } from "@renderer/scripts/convertirFecha";
import { ActiveSubMenuDeleteUsers } from "./actionsUsers";
import { ACTIVEMENUVERCONTRATO } from "@renderer/type";
const apiUrl = import.meta.env.VITE_API_URL;

export const ActiveMenuVerContrato = (value: any) => ({ type: ACTIVEMENUVERCONTRATO, value: value });

export const Fetch_contratos = (userId) => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
        const { loginAccess } = getState();
        const conexionSse = loginAccess.conexionSse;
        if (conexionSse) {
            try {
                const response = await fetch(`${apiUrl}/api/contratos`, {
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
    };
}

export const Fetch_contratosPorVencer = (userId) => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
        const { loginAccess } = getState();
        const conexionSse = loginAccess.conexionSse;
        if (conexionSse) {
            try {
                const response = await fetch(`${apiUrl}/api/contratos-por-vencer`, {
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
    };
}

export const Fetch_new_contrato = (dataInput: any, userId: string, date: number, dateFin: Date, activeNewEmpleado, userData: any, valorSalario: string, reset: () => void) => {
    const token = localStorage.getItem("token");
    return async (dispatch) => {
        try {
            const response = await fetch(`${apiUrl}/api/contrato`, {
                method: 'POST',
                headers: {
                    'x-id-usuario': userId,
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    tipo_contrato: dataInput.tContrato,
                    fecha_inicio: dataInput.fInicio,
                    fecha_fin: dataInput.tContrato == 'Fijo' || dataInput.tContrato == 'Fijo Manejo y Confianza' ? dateFin : null,
                    meses: date,
                    cantidad_prorrogas: 0,
                    estado: dataInput.estado,
                    id_empleado: activeNewEmpleado.user.id_empleado,
                    id_cargo: dataInput.cargo,
                    salario: limpiarNumero(valorSalario),
                    empleador: dataInput.empleador,
                    reqUser: userData
                }),
            });

            const result = await response.json();
            if (response.ok) {
                dispatch(ActiveSubMenuEmpleado({ user: {}, subMenuEmpleado: false }));
                dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'submit' }));
                reset();
            } else {
                dispatch(ActiveErrorSpam({ msg: result.error, active: true, typeError: 'error' }));
                throw new Error(result.error);
            }
        } catch (error) {
            console.log('Ocurrió un error al crear este contrato');
        }
    }
}

export const Fetch_generar_contrato = (activeNewEmpleado: any, userCargo: any, contFilter: any, contFilterEmpleador: any, userData: any, setLoader, userId: string) => {
    const token = localStorage.getItem("token");
    return async () => {
        setLoader(true);

        const response = await fetch(`${apiUrl}/api/generar-contrato`, {
            method: 'POST',
            headers: {
                'x-id-usuario': userId,
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                nombre: `${activeNewEmpleado.nombres} ${activeNewEmpleado.apellidos}`,
                cedula: activeNewEmpleado.cedula,
                tipo_contrato: contFilter.tipo_contrato,
                direccion: activeNewEmpleado.direccion,
                cargo: userCargo.filter((item) => item.id_cargo == contFilter.id_cargo)[0].nombre_cargo,
                correo: activeNewEmpleado.correo,
                salario: formatearNumero(String(contFilter.salario)),
                fecha_inicio: formatearFecha(contFilter.fecha_inicio.toString().split('T')[0]),
                fecha_fin: contFilter.fecha_fin ? formatearFecha(contFilter.fecha_fin.toString().split('T')[0]) : 'INDEFINIDO',
                fechaNacimiento: formatearFecha(activeNewEmpleado.fecha_nacimiento.toString().split('T')[0]),
                lugarNacimiento: activeNewEmpleado.lugar_nacimiento.split(',').slice(0, -1),
                gentilicio: activeNewEmpleado.lugar_nacimiento.split(',').at(-1),
                nombre_empleador: contFilterEmpleador.nombre_empleador,
                nit: contFilterEmpleador.nit,
                direccion_empleador: contFilterEmpleador.direccion_empleador,
                reqUser: userData
            }),
        });
        const blob = await response.blob();
        setLoader(false);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `contrato?${activeNewEmpleado.nombres}_${contFilter.id_contrato}.pdf`;
        a.click();
    }
}

export const Fetch_desactivar_contrato = (activeDeleteUsers: any, userData: any) => {
    const token = localStorage.getItem("token");
    return async (dispatch) => {
        try {
            await fetch(`${apiUrl}/api/contrato/${activeDeleteUsers.user.id_contrato}`, {
                method: 'PUT',
                headers: {
                    'x-id-usuario': userData.id_usuario,
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    estado: 'Inactivo',
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
            dispatch(ActiveErrorSpam({ msg: 'Error no se puedo desactivar este contrato', active: true, typeError: 'error' }));
            console.log(error)
        }
    }
}

export const Fetch_prorroga_contrato = (userData, activeDeleteUsers) => {
    const token = localStorage.getItem("token");
    return async (dispatch) => {
        try {
            const response = await fetch(`${apiUrl}/api/contrato-prorroga/${activeDeleteUsers.id_contrato}`, {
                method: 'PUT',
                headers: {
                    'x-id-usuario': userData.id_usuario,
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    reqUser: userData
                }),
            })
            const result = await response.json();

            if (response.ok) {
                dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'submit' }));
                // dispatch(ActiveSubMenuDeleteUsers({
                //     user: {},
                //     activeDeleteUsers: false
                // }))
                dispatch(dispatch(ActiveMenuVerContrato({ user: {}, subMenuVerContrato: false })))
            } else {
                dispatch(ActiveErrorSpam({ msg: result.error, active: true, typeError: 'error' }));
                // dispatch(ActiveSubMenuDeleteUsers({
                //     user: {},
                //     activeDeleteUsers: false
                // }))
            }
        } catch (error) {
            dispatch(ActiveErrorSpam({ msg: 'Error no se puedo prorrogar este contrato', active: true, typeError: 'error' }));
            console.log(error)
        }
    }
}