import { obtenerRangoDelMesSiEsPrimerDia } from "@renderer/scripts/calcularInicio&FinDeMes";
import { obtenerSemanaSiEsLunes } from "@renderer/scripts/calcularLunesYDomingo";
import { ActiveErrorSpam } from "./actionsLogin";
const apiUrl = import.meta.env.VITE_API_URL;


export const Fetch_generar_reporte = (dataInput: any, seleted: string, userId: string, userData: any, setLoader) => {
    const token = localStorage.getItem("token");
    setLoader(true);
    return async (dispatch) => {
        try {
            const fechaIniSemana: any = obtenerSemanaSiEsLunes(dataInput.fecha_inicio);
            const fechaIniMes: any = obtenerRangoDelMesSiEsPrimerDia(dataInput.fecha_inicio);
            let fechaFin;
            let idEmpleado = null;
            if (seleted == 'Asistencia semanal' && fechaIniSemana != null) {
                fechaFin = fechaIniSemana.domingo
            } else if (seleted == 'Asistencia diaria') {
                fechaFin = dataInput.fecha_inicio
            } else if (seleted == 'Asistencia general') {
                fechaFin = dataInput.fecha_fin
            } else if (seleted == 'Asistencia mensual' && fechaIniMes != null) {
                fechaFin = fechaIniMes.finMes
            } else if (fechaIniMes == null && seleted == 'Asistencia mensual') {
                dispatch(ActiveErrorSpam({ msg: 'Tienes que ingresar el primer dia del mes para procesar este reporte', active: true, typeError: 'error' }));
            } else if (fechaIniSemana == null && seleted == 'Asistencia semanal') {
                dispatch(ActiveErrorSpam({ msg: 'Tienes que ingresar un lunes para procesar este reporte', active: true, typeError: 'error' }));
            } else if (seleted == 'Asistencias por empleado') {
                fechaFin = dataInput.fecha_fin
                idEmpleado = dataInput.id_empleado;
            }
            const response = await fetch(`${apiUrl}/api/generar-reporte`, {
                method: 'POST',
                headers: {
                    'x-id-usuario': userId,
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    fecha_ini: dataInput.fecha_inicio,
                    fecha_fin: fechaFin,
                    id_pv: dataInput.punto_venta,
                    type_report: seleted,
                    id_empleado: idEmpleado,
                    type_archive: dataInput.tipo_archivo,
                    reqUser: userData.userLogin
                }),
            });

            if (!response.ok) throw new Error('Error al generar este archivo');

            if (dataInput.tipo_archivo == 'excel') {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `reporte_asistencias_${dataInput.punto_venta}_${seleted}.xlsx`;
                a.click();
            } else {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.href = url;
                a.download = `asistencias_${dataInput.punto_venta}_${seleted}.pdf`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            }
            setLoader(false);
        } catch (error) {
            console.log(error);
        }
    }
}