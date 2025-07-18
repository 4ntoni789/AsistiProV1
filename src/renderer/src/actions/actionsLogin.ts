import { ACTIVEDARKMODE, ACTIVEDELETEUSER, ACTIVEERRORSPAM, ACTIVEMENU, ACTIVEMENUVERACCESOS, ACTIVENEWEMPLEADO, ACTIVEREGISTERNEWUSER, ACTIVESUBMENUEMPLEADOS, ACTIVESUBMENUNEWCARGO, ACTIVESUBMENUNEWEMPLEADOR, ACTIVESUBMENUNEWROLE, ACTIVESUBMENUNUEWPUNTOVENTA, ACTIVESUBMENUPUNTOVENTA, ACTIVESUBMENUUPDATECARGO, ACTIVESUBMENUUPDATEEMPLEADOR, ACTIVESUBMENUUPDATEPASS, ACTIVESUBMENUUPDATEPUNTOVENTA, ACTIVESUBMENUUPDATEROLE, ACTIVEUPDATEUSER, ERRORLOGIN, LOGOUT, SUBMENUACTIVE, VALIDATIONLOGI } from "@renderer/type";
import { type } from "os";

export const ValidationData = (value: object) => ({ type: VALIDATIONLOGI, value });

export const Logout = () => ({ type: LOGOUT });

export const ErrorLoginSpam = (value: any) => ({ type: ERRORLOGIN, value });

// menus

export const ActivatedMenu = (value: any) => ({ type: ACTIVEMENU, value });

export const ActiveSubMenu = (value: any) => ({ type: SUBMENUACTIVE, value });

export const ActiveSubMenuNewUsers = (value: any) => ({ type: ACTIVEREGISTERNEWUSER, value });

export const ActiveSubMenuDeleteUsers = (value: any) => ({ type: ACTIVEDELETEUSER, value });

export const ActiveErrorSpam = (value: any) => ({ type: ACTIVEERRORSPAM, value })

export const ActiveSubMenuUpdateUsers = (value: any) => ({ type: ACTIVEUPDATEUSER, value });

export const ActiveSubMenuNewEmpleado = (value: any) => ({ type: ACTIVENEWEMPLEADO, value });

export const ActiveSubMenuEmpleado = (value: any) => ({ type: ACTIVESUBMENUEMPLEADOS, value });

export const ActiveSubMenuNewCargo = (value: any) => ({ type: ACTIVESUBMENUNEWCARGO, value });

export const ActiveSubMenuUpdateCargo = (value: any) => ({ type: ACTIVESUBMENUUPDATECARGO, value });

export const ActiveSubMenuNewRole = (value: any) => ({ type: ACTIVESUBMENUNEWROLE, value });

export const ActiveSubMenuUpdateRole = (value: any) => ({ type: ACTIVESUBMENUUPDATEROLE, value });

export const ActiveSubMenuNewPuntoVenta = (value: any) => ({ type: ACTIVESUBMENUNUEWPUNTOVENTA, value });

export const ActiveSubMenuUpdatePuntoVenta = (value: any) => ({ type: ACTIVESUBMENUUPDATEPUNTOVENTA, value });

export const ActiveSubMenuPuntoVenta = (value: any) => ({ type: ACTIVESUBMENUPUNTOVENTA, value });

export const ActiveSubMenuNewEmpleador = (value: any) => ({ type: ACTIVESUBMENUNEWEMPLEADOR, value });

export const ActiveSubMenuUpdateEmpleador = (value: any) => ({ type: ACTIVESUBMENUUPDATEEMPLEADOR, value });

export const ActiveSubMenuUpdatePass = (value: any) => ({ type: ACTIVESUBMENUUPDATEPASS, value });

export const ActiveDarkMode = (value: boolean) => ({ type: ACTIVEDARKMODE, value });

export const ActiveMenuVerAccesos = (value: object) => ({ type: ACTIVEMENUVERACCESOS, value });