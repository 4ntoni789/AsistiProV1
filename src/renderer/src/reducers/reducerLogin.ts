import { ERRORLOGIN, LOGOUT, VALIDATIONLOGI } from "@renderer/type";

const initalState: object = {
  userLogin: {},
  validationAccess: false,
  activeError: false
}

export default function accesoLogin(state = initalState, action: any) {
  switch (action.type) {
    case VALIDATIONLOGI: {
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