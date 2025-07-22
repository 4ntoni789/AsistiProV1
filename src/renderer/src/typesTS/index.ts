export type DataLogin = {
  nombre_usuario: string,
  contrasena: string
}

export interface Props {
  registros?: Array<object>;
  start: number;
  end: number;
  allowedStartEntrada?: number;
  allowedEndEntrada?: number;

  allowedStartSalida?: number;
  allowedEndSalida?: number;

  earlyExit: boolean;
  graceMinutes: number;
  breakStart: number;
  breakEnd: number;
}

export interface Props2 {
  registros?: Array<object>;
}


export type InicialStateLogin = {
  userLogin: object,
  validationAccess: boolean,
  activeError: boolean
}

export type UserDataType = {
  loginAccess: {
    userLogin: {
      correo: string,
      estado: string,
      id_rol: number,
      id_usuario: number,
      nombre_usuario: string,
      type_role: string
    },
    validationAccess: boolean,
    activeError: boolean
  }
}