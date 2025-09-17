import { ACTIVESUBMENUNEWEMPLEADOR, ACTIVESUBMENUUPDATEEMPLEADOR } from "@renderer/type";
import { ActiveErrorSpam } from "./actionsLogin";
import { ActiveSubMenuDeleteUsers } from "./actionsUsers";
const apiUrl = import.meta.env.VITE_API_URL;


export const Fetch_empleadores = (userId: string) => {
  const token = localStorage.getItem("token");
  return async (dispatch, getState) => {
    const { loginAccess } = getState();
    const conexionSse = loginAccess.conexionSse;
    if (conexionSse) {
      try {
        const response = await fetch(`${apiUrl}/api/empleadores`, {
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

export const ActiveSubMenuNewEmpleador = (value: any) => ({ type: ACTIVESUBMENUNEWEMPLEADOR, value });

export const Fetch_new_empleador = (dataInput: any, userId: string, userData: any, reset: () => void) => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    try {
      const response = await fetch(`${apiUrl}/api/empleador`, {
        method: 'POST',
        headers: {
          'x-id-usuario': userId,
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
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
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    try {
      const response = await fetch(`${apiUrl}/api/empleador/${activeUpdateEmpleador.user.item.id_empleador}`, {
        method: 'PUT',
        headers: {
          'x-id-usuario': userId,
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
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

export const Fetch_delete_empleador = (activeDeleteUsers: any, userData: any) => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    try {
      const response = await fetch(`${apiUrl}/api/empleador/${activeDeleteUsers.user.id_empleador}`, {
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