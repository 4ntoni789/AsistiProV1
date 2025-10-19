export type DataLogin = {
  nombre_usuario: string,
  contrasena: string
}

export type DataForgotPass = {
  correo_recuperacion: string,
  codigo_recuperacion:string
}
export interface Props {
  registros?: Array<object>;
  start: number;
  allowedStartEntrada?: number;
  allowedEndEntrada?: number;

  end: number;
  allowedStartSalida?: number;
  allowedEndSalida?: number;

  earlyExit: boolean;
  graceMinutes: number;

  breakStart: number | null;
  salidaValidaDescanso: number | null;
  salidaValidaDescansoHasta: number | null;

  breakEnd: number | null;
  entradaValidaDescanso: number | null;
  entradaValidaDescansoHasta: number | null;

  horaInicioSinFormatear?: string | any,
  horaFinSinFormatear?: string | any,
  horaInicioAlmuerzoSinFormatear?: string | any,
  horaFinAlmuerzoSinFormatear?: string | any,
}

export interface Props2 {
  registros?: Array<object>;
}


export type InicialStateLogin = {
  userLogin: object,
  validationAccess: boolean,
  activeError: boolean,
  loadingLogin: boolean,
  conexionSse: boolean
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
