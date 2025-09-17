import { ACTIVEDARKMODE, ACTIVEDELETEUSER, ACTIVEERRORSPAM, ACTIVEMENU, ACTIVEMENUVERACCESOS, ACTIVEMENUVERCONTRATO, ACTIVENEWEMPLEADO, ACTIVEREGISTERNEWUSER, ACTIVESUBMENUEMPLEADOS, ACTIVESUBMENUNEWCARGO, ACTIVESUBMENUNEWEMPLEADOR, ACTIVESUBMENUNEWROLE, ACTIVESUBMENUNUEWPUNTOVENTA, ACTIVESUBMENUPUNTOVENTA, ACTIVESUBMENUUPDATECARGO, ACTIVESUBMENUUPDATEEMPLEADOR, ACTIVESUBMENUUPDATEPASS, ACTIVESUBMENUUPDATEPUNTOVENTA, ACTIVESUBMENUUPDATEROLE, ACTIVEUPDATEUSER, LOADINGPUNTOVENTA, NEWNOTIFICACION, REMOTENOTIFICACION, SUBMENUACTIVE } from "@renderer/type";

const initalState: any = {
    menuActive: true,
    subMenuActive: false,
    darkMode: true,
    errorSpam: {
        msg: '',
        active: false,
        typeError: ''
    },
    subMenuNewUsers: {
        user: {},
        subMenuNewUsers: false,
        loading: false
    },
    deleteUser: {
        user: {},
        subMenuDeleteUser: false,
        typeRemove: '',
        loading: false
    },
    subMenuUpdateUser: {
        user: {},
        subMenuUpdateUser: false,
        loading: false
    },
    subMenuNewEmpleado: {
        user: {},
        subMenuNewEmpleado: false
    },
    subMenuEmpleado: {
        user: {},
        subMenuEmpleado: false
    },
    subMenuNewCargo: {
        user: {},
        subMenuNewCargo: false
    },
    subMenuUpdateCargo: {
        user: {},
        subMenuUpdateCargo: false
    },
    subMenuNewRole: {
        user: {},
        subMenuNewRole: false
    },
    subMenuUpdateRole: {
        user: {},
        subMenuUpdateRole: false
    },
    subMenuNewPuntoVenta: {
        user: {},
        subMenuNewPuntoVenta: false
    },
    subMenuUpdatePuntoVenta: {
        user: {},
        subMenuUpdatePuntoVenta: false
    },
    subMenuPuntoVenta: {
        user: {},
        loading: false,
        subMenuPuntoVenta: false
    },
    subMenuNewEmpleador: {
        user: {},
        subMenuNewEmpleador: false
    },
    subMenuUpdateEmpleador: {
        user: {},
        subMenuUpdateEmpleador: false
    },
    subMenuUpdatePass: {
        user: {},
        subMenuUpdatePass: false
    },
    subMenuVerAccesos: {
        user: {},
        subMenuVerAccesos: false,
        accesos: []
    },
    subMenuVerContrato: {
        user: {},
        subMenuVerContrato: false
    },
    notificacion: {
        tipo: []
    }
}

export default function activeMenu(state = initalState, action: any) {
    switch (action.type) {
        case ACTIVEMENU: {
            return {
                ...state,
                menuActive: action.value,
            }
        }

        case SUBMENUACTIVE: {
            return {
                ...state,
                subMenuActive: action.value
            }
        }
        case ACTIVEREGISTERNEWUSER: {
            return {
                ...state,
                subMenuNewUsers: action.value
            }
        }
        case ACTIVEDELETEUSER: {
            return {
                ...state,
                deleteUser: action.value
            }
        }

        case ACTIVEERRORSPAM: {
            return {
                ...state,
                errorSpam: action.value
            }
        }
        case ACTIVEUPDATEUSER: {
            return {
                ...state,
                subMenuUpdateUser: action.value
            }
        }
        case ACTIVENEWEMPLEADO: {
            return {
                ...state,
                subMenuNewEmpleado: action.value
            }
        }
        case ACTIVESUBMENUEMPLEADOS: {
            return {
                ...state,
                subMenuEmpleado: action.value
            }
        }
        case ACTIVESUBMENUNEWCARGO: {
            return {
                ...state,
                subMenuNewCargo: action.value
            }
        }
        case ACTIVESUBMENUUPDATECARGO: {
            return {
                ...state,
                subMenuUpdateCargo: action.value
            }
        }
        case ACTIVESUBMENUNEWROLE: {
            return {
                ...state,
                subMenuNewRole: action.value
            }
        }
        case ACTIVESUBMENUUPDATEROLE: {
            return {
                ...state,
                subMenuUpdateRole: action.value
            }
        }
        case ACTIVESUBMENUNUEWPUNTOVENTA: {
            return {
                ...state,
                subMenuNewPuntoVenta: action.value
            }
        }
        case LOADINGPUNTOVENTA: {
            return {
                ...state,
                subMenuPuntoVenta: {
                    ...state.subMenuPuntoVenta,
                    loading: action.value
                }
            }
        }
        case ACTIVESUBMENUUPDATEPUNTOVENTA: {
            return {
                ...state,
                subMenuUpdatePuntoVenta: action.value
            }
        }
        case ACTIVESUBMENUPUNTOVENTA: {
            return {
                ...state,
                subMenuPuntoVenta: action.value
            }
        }
        case ACTIVESUBMENUNEWEMPLEADOR: {
            return {
                ...state,
                subMenuNewEmpleador: action.value
            }
        }

        case ACTIVESUBMENUUPDATEEMPLEADOR: {
            return {
                ...state,
                subMenuUpdateEmpleador: action.value
            }
        }
        case ACTIVESUBMENUUPDATEPASS: {
            return {
                ...state,
                subMenuUpdatePass: action.value
            }
        }
        case ACTIVEDARKMODE: {
            return {
                ...state,
                darkMode: action.value
            }
        }
        case ACTIVEMENUVERACCESOS: {
            return {
                ...state,
                subMenuVerAccesos: action.value
            }
        }
        case ACTIVEMENUVERCONTRATO: {
            return {
                ...state,
                subMenuVerContrato: action.value
            }
        }
        case NEWNOTIFICACION: {
            return {
                ...state,
                notificacion: {
                    ...state.notificacion,
                    tipo: [...state.notificacion.tipo, action.value]
                }
            }
        }
        case REMOTENOTIFICACION: {
            const newNotificacion = state.notificacion.tipo.filter(notifi => notifi.tipo != action.value);
            return {
                ...state,
                notificacion: {
                    tipo: newNotificacion
                }
            }

        }
        default:
            return state;
    }
}