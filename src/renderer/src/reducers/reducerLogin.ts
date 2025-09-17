import { ERRORLOGIN, LOADINGLOGIN, LOGOUT, STATECONEXIONSSE, SUBMITLOGIN } from "@renderer/type";
import { InicialStateLogin } from "@renderer/typesTS";

const initalState: InicialStateLogin = {
  userLogin: {},
  validationAccess: false,
  activeError: false,
  loadingLogin: false,
  conexionSse: false
}

export default function accesoLogin(state = initalState, action: any) {
  switch (action.type) {
    case SUBMITLOGIN: {
      return {
        ...state,
        userLogin: action.value,
        validationAccess: true,
        loadingLogin: false
      }
    }

    case LOGOUT: {
      return {
        ...state,
        userLogin: null,
        validationAccess: false
      }
    }

    case ERRORLOGIN: {
      return {
        ...state,
        activeError: action.value
      }
    }
    case LOADINGLOGIN: {
      return {
        ...state,
        loadingLogin: action.value
      }
    }
    case STATECONEXIONSSE: {
      return {
        ...state,
        conexionSse: action.value
      }
    }
    default:
      return state;
  }
}