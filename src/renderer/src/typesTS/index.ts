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
