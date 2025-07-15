export type DataLogin = {
    nombre_usuario: string,
    contrasena: string
}

export interface Props {
  start: number;
  end: number;
  allowedStartEntrada: number;
  allowedEndEntrada: number;

  allowedStartSalida:number;
  allowedEndSalida:number;

  earlyExit: boolean;
  graceMinutes?: number;
  breakStart?: number;
  breakEnd?: number;
}
