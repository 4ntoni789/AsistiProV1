export const obtenerDatos = async (funAsic, resVar) => {
  const data: any = await funAsic;
  resVar(data);
}