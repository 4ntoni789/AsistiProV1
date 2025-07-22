import { ERRORLOGIN, LOGOUT, SUBMITLOGIN } from "@renderer/type";
import { InicialStateLogin } from "@renderer/typesTS";

const initalState: InicialStateLogin = {
  userLogin: {},
  validationAccess: false,
  activeError: false
}

export default function accesoLogin(state = initalState, action: any) {
  switch (action.type) {
    case SUBMITLOGIN: {
      return {
        ...state,
        userLogin: action.value,
        validationAccess: true
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
    default:
      return state;
  }
}