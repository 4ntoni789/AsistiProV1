import { NEWNOTIFICACION, REMOTENOTIFICACION } from "@renderer/type";

export const NewNotificacion = (value: any) => ({ type: NEWNOTIFICACION, value });

export const ObservadorDeNotificaciones = (source) => {
    return async (dispatch) => {
        const notificaciones = ['login', 'acceso', 'contrato', 'empleado', 'contratos-vencer-vencidos', 'nuevas-marcaciones', 'nuevo-usuario', 'nuevo-contrato', 'nuevo-empleado'];
        notificaciones.forEach(tipo => {
            source.addEventListener(tipo, (event) => {
                dispatch(NewNotificacion({
                    tipo: tipo,
                    data: JSON.parse(event.data)
                }))
            });
        });
    }
}

export const EliminarNotificacion = (value: string) => ({ type: REMOTENOTIFICACION, value });