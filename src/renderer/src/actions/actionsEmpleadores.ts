import { ACTIVESUBMENUNEWEMPLEADOR, ACTIVESUBMENUUPDATEEMPLEADOR } from "@renderer/type";
import { ActiveErrorSpam } from "./actionsLogin";
const apiUrl = import.meta.env.VITE_API_URL;


export const Fetch_empleadores = (userId: string) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${apiUrl}/api/empleadores`, {
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

export const ActiveSubMenuNewEmpleador = (value: any) => ({ type: ACTIVESUBMENUNEWEMPLEADOR, value });

export const Fetch_new_empleador = (dataInput: any, userId: string, userData: any, reset: () => void) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${apiUrl}/api/empleador`, {
        method: 'POST',
        headers: {
          'x-id-usuario': userId,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre_empleador: dataInput.nombre_empleador,
          nit: dataInput.nit_empleador,
          direccion_empleador: dataInput.direccion_empleador,
          reqUser: userData
        }),
      });

      const result = await response.json();
      if (response.ok) {
        dispatch(ActiveSubMenuNewEmpleador({ user: {}, subMenuNewEmpleador: false }));
        dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'submit' }));
        reset();
      } else {
        dispatch(ActiveErrorSpam({ msg: result.error, active: true, typeError: 'error' }));
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('Ocurrió un error al crear este empleador');
    }
  }
}

export const ActiveSubMenuUpdateEmpleador = (value: any) => ({ type: ACTIVESUBMENUUPDATEEMPLEADOR, value });

export const Fetch_update_empleador = (dataInput: any, userId: string, activeUpdateEmpleador: any, userData: any) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${apiUrl}/api/empleador/${activeUpdateEmpleador.user.item.id_empleador}`, {
        method: 'PUT',
        headers: {
          'x-id-usuario': userId,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre_empleador: dataInput.nombre_empleador,
          nit: dataInput.nit,
          direccion_empleador: dataInput.direccion,
          reqUser: userData
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      dispatch(ActiveErrorSpam({ msg: 'Empleador actualizado', active: true, typeError: 'submit' }));
      dispatch(ActiveSubMenuUpdateEmpleador({ user: {}, subMenuUpdateCargo: false }));
    } catch (error) {
      dispatch(ActiveErrorSpam({ msg: 'Error al actualizar este Empleador', active: true, typeError: 'Error' }));
      console.log('Ocurrió un error al actualizar este Empleador');
    }
  }
}
