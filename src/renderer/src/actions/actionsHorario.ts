import { ActiveErrorSpam } from "./actionsLogin";
import { ActiveSubMenuPuntoVenta } from "./actionsPuntoDeVenta";
import { ActiveSubMenuDeleteUsers } from "./actionsUsers";
const apiUrl = import.meta.env.VITE_API_URL;


export const Fetch_horario = (userId: string, activeMenuPuntoVenta: any) => {
    const token = localStorage.getItem("token");
    return async () => {
        try {
            const response = await fetch(`${apiUrl}/api/horarios`, {
                headers: {
                    'x-id-usuario': userId,
                    "Authorization": `Bearer ${token}`
                }
            });

            const result = await response.json();

            if (response.ok) {
                const resultado = result
                    .filter((item: any) => item.id_pv === activeMenuPuntoVenta.user?.item?.id_pv)
                    .reduce((acc: any[], curr: any) => {
                        const existente = acc.find(g => g.turno === curr.turno && g.cargo === curr.id_cargo);

                        if (existente) {
                            existente.horarios.push(curr);
                        } else {
                            acc.push({
                                turno: curr.turno,
                                cargo: curr.id_cargo,
                                horarios: [curr]
                            });
                        }
                        return acc;
                    }, []);

                return resultado;
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

export const Fetch_new_horario = (dataInput, puntoVenta, almacenDiasSemana, userData, semana, userId, reset: () => void) => {
    const token = localStorage.getItem("token");
    return async (dispatch) => {
        if (semana == 'dias_especificos' || semana == 'toda_semana') {
            if (almacenDiasSemana.length > 0) {
                try {
                    const response = await fetch(`${apiUrl}/api/horario`, {
                        method: 'POST',
                        headers: {
                            'x-id-usuario': userId,
                            'Content-Type': 'application/json',
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            hora_entrada: dataInput.hora_entrada,
                            hora_valida_entrada: dataInput.hora_valida_entrada,
                            hora_valida_entrada_hasta: dataInput.hora_valida_entrada_hasta,
                            hora_salida_descanso: dataInput.hora_salida_descanso,
                            hora_regreso_descanso: dataInput.hora_regreso_descanso,
                            hora_salida: dataInput.hora_salida,
                            hora_valida_salida: dataInput.hora_valida_salida,
                            hora_valida_salida_hasta: dataInput.hora_valida_salida_hasta,
                            margen: dataInput.margen,
                            turno: dataInput.turno,
                            cargo: dataInput.cargo,
                            semana: almacenDiasSemana,
                            id_pv: puntoVenta.user.item.id_pv,
                            reqUser: userData
                        }),
                    });
                    const result = await response.json();
                    if (response.ok) {
                        dispatch(ActiveSubMenuPuntoVenta({ user: {}, subMenuPuntoVenta: false }));
                        dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'submit' }));
                        reset();
                    } else {
                        dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'error' }));
                        throw new Error(result.message);
                    }
                } catch (error) {
                    console.log(error)
                }
            } else {
                dispatch(ActiveErrorSpam({ msg: 'Seleciona los dias que este horario va a tener', active: true, typeError: 'error' }));
            }
        } else {
            dispatch(ActiveErrorSpam({ msg: 'Seleciona los dias que este horario va a tener', active: true, typeError: 'error' }));
        }
    }
}

export const Fetch_delete_horario = (activeDeleteUsers: any, userData: any) => {
    const token = localStorage.getItem("token");
    return async (dispatch) => {
        try {
            const response = await fetch(`${apiUrl}/api/horario/${activeDeleteUsers.user.id_horario}`, {
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
            dispatch(ActiveErrorSpam({ msg: 'Error al eliminar este empleador', active: true, typeError: 'error' }));
            console.log(error)
        }
    }
}