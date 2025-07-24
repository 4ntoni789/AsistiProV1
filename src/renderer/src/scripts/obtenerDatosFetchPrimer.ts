export const obtenerDatosPrimerCoincidencia = async (funAsic, resVar, id) => {
    const data: any = await funAsic;
    resVar(data.filter((item) => (item.id_empleado == id)))
}