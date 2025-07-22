import { ACTIVESUBMENUNEWROLE, ACTIVESUBMENUUPDATEROLE } from "@renderer/type";
import { ActiveErrorSpam } from "./actionsLogin";
const apiUrl = import.meta.env.VITE_API_URL;


export const Fetch_roles = (userId: string) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${apiUrl}/api/roles`, {
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
  }
}

export const ActiveSubMenuNewRole = (value: any) => {
  return {
    type: ACTIVESUBMENUNEWROLE,
    value: value
  }
};

export const Fetch_new_role = (dataInput: any, userId: string, userData: any, reset: () => void) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${apiUrl}/api/rol`, {
        method: 'POST',
        headers: {
          'x-id-usuario': userId,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre_rol: dataInput.nombre_rol,
          reqUser: userData
        }),
      });

      const result = await response.json();
      if (response.ok) {
        dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'submit' }));
        reset();
        dispatch(ActiveSubMenuNewRole({ user: {}, subMenuNewRole: false }));
      } else {
        dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'submit' }));
        throw new Error(result.error);
      }
    } catch (error) {
      dispatch(ActiveErrorSpam({ msg: 'Error al crear este rol', active: true, typeError: 'Error' }));
      console.error('Error:', error);
    }
  }
}

export const ActiveSubMenuUpdateRole = (value: any) => {
  return {
    type: ACTIVESUBMENUUPDATEROLE,
    value: value
  }
};

export const Fetch_update_role = (dataInput: any, userId: string, activeUpdateRole: any, userData: any) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${apiUrl}/api/rol/${activeUpdateRole.user.item.id_rol}`, {
        method: 'PUT',
        headers: {
          'x-id-usuario': userId,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre_rol: dataInput.nombre_rol,
          reqUser: userData
        }),
      });
      const result = await response.json();
      if (response.ok) {
        dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'submit' }));
        dispatch(ActiveSubMenuUpdateRole({ user: {}, subMenuUpdateRole: false }));
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      dispatch(ActiveErrorSpam({ msg: 'Error al actualizar este rol', active: true, typeError: 'Error' }));
      console.log('Ocurrió un error al actualizar este rol');
    }
  }
}