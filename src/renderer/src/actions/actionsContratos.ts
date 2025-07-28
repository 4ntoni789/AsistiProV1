import { limpiarNumero } from "@renderer/scripts/limpiarNumero";
import { ActiveSubMenuEmpleado } from "./actionsEmpleados";
import { ActiveErrorSpam } from "./actionsLogin";
import { formatearNumero } from "@renderer/scripts/formatearNumero";
import { formatearFecha } from "@renderer/scripts/convertirFecha";

const apiUrl = import.meta.env.VITE_API_URL;

export const Fetch_contratos = (userId) => {
    return async () => {
        try {
            const response = await fetch(`${apiUrl}/api/contratos`, {
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

export const Fetch_new_contrato = (dataInput: any, userId: string, date: number, dateFin: Date, activeNewEmpleado, userData: any, valorSalario: string, reset: () => void) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${apiUrl}/api/contrato`, {
                method: 'POST',
                headers: {
                    'x-id-usuario': userId,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tipo_contrato: dataInput.tContrato,
                    fecha_inicio: dataInput.fInicio,
                    fecha_fin: dataInput.tContrato == 'Fijo' ? dateFin : null,
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
    return async () => {
        setLoader(true);

        const response = await fetch(`${apiUrl}/api/generar-contrato`, {
            method: 'POST',
            headers: {
                'x-id-usuario': userId,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: `${activeNewEmpleado.user.nombres} ${activeNewEmpleado.user.apellidos}`,
                cedula: activeNewEmpleado.user.cedula,
                direccion: activeNewEmpleado.user.direccion,
                cargo: userCargo.filter((item) => item.id_cargo == contFilter.id_cargo)[0].nombre_cargo,
                correo: activeNewEmpleado.user.correo,
                salario: formatearNumero(String(contFilter.salario)),
                fecha_inicio: formatearFecha(contFilter.fecha_inicio.toString().split('T')[0]),
                fecha_fin: contFilter.fecha_fin ? formatearFecha(contFilter.fecha_fin.toString().split('T')[0]) : 'INDEFINIDO',
                fechaNacimiento: formatearFecha(activeNewEmpleado.user.fecha_nacimiento.toString().split('T')[0]),
                lugarNacimiento: activeNewEmpleado.user.lugar_nacimiento.split(',').slice(0, -1),
                gentilicio: activeNewEmpleado.user.lugar_nacimiento.split(',').at(-1),
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
        a.download = `contrato?${activeNewEmpleado.user.nombres}_${contFilter.id_contrato}.pdf`;
        a.click();
    }
}