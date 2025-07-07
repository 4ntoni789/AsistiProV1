type RegistroCrudo = {
  direccion: "entrada" | "salida";
  fecha_hora_autenticacion: string;
  numero_empleado: string;
  nombre_persona: string;
};

type RegistroAgrupado = {
  numero_empleado: string;
  nombre_persona: string;
  fecha: string;
  registros: {
    tipo: "entrada" | "salida" | "entrada_almuerzo" | "salida_almuerzo";
    hora: string;
  }[];
};

export const agruparRegistrosPorDia = (registros: RegistroCrudo[]): RegistroAgrupado[] => {
  const grupos: Record<string, Omit<RegistroAgrupado, 'registros'> & {
    registros: { tipo: string; horaCompleta: string }[];
  }> = {};

  registros.forEach((registro) => {
    const fecha = new Date(registro.fecha_hora_autenticacion).toISOString().split("T")[0];
    const key = `${registro.numero_empleado}-${fecha}`;

    if (!grupos[key]) {
      grupos[key] = {
        numero_empleado: registro.numero_empleado,
        nombre_persona: registro.nombre_persona,
        fecha,
        registros: []
      };
    }

    grupos[key].registros.push({
      tipo: registro.direccion,
      horaCompleta: registro.fecha_hora_autenticacion
    });
  });

  return Object.values(grupos).map((grupo) => {
    grupo.registros.sort((a, b) =>
      new Date(a.horaCompleta).getTime() - new Date(b.horaCompleta).getTime()
    );

    const registrosFinales = grupo.registros.map((r) => {
      const hora = new Date(r.horaCompleta).toISOString().split("T")[1].substring(0, 5);
      const horaNum = parseInt(hora.split(":")[0], 10);
      const minutos = parseInt(hora.split(":")[1], 10);

      if (r.tipo === "entrada") {
        if (horaNum < 12) return { tipo: "entrada" as const, hora };
        else return { tipo: "entrada_almuerzo" as const, hora };
      } else if (r.tipo === "salida") {
        if (horaNum === 12 && minutos >= 20 && minutos <= 40) {
          return { tipo: "salida_almuerzo" as const, hora };
        } else if (horaNum >= 13 && horaNum < 17) {
          return { tipo: "salida_almuerzo" as const, hora };
        } else {
          return { tipo: "salida" as const, hora };
        }
      }
      return { tipo: r.tipo as any, hora };
    });

    return {
      numero_empleado: grupo.numero_empleado,
      nombre_persona: grupo.nombre_persona,
      fecha: grupo.fecha,
      registros: registrosFinales
    };
  });
};
