export const obtenerDatos = async (dataInput, funAsic, resVar) => {
    const data: any = await funAsic;
    resVar(data);
  }