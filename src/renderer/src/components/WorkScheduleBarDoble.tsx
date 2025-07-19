import React, { useEffect, useState } from 'react';
import '../css/workScheduleBar.css';
import { Props, Props2 } from '@renderer/typesTS';
import { horaToDecimal } from '@renderer/scripts/horaDecimal';

export const WorkScheduleBarDoble: React.FC<Props2> = ({ registros }) => {
  const [valoresLineaTiempo, setValoresLineaTiempo] = useState<Props>({
    start: 0,
    end: 0,
    allowedStartEntrada: 0,
    allowedEndEntrada: 0,
    allowedStartSalida: 0,
    allowedEndSalida: 0,
    earlyExit: false,
    breakStart: 0,
    breakEnd: 0,
    graceMinutes: 0
  })

  useEffect(() => {
    setValoresLineaTiempo({
      start: 0,
      end: 0,
      allowedStartEntrada: 0,
      allowedEndEntrada: 0,
      allowedStartSalida: 0,
      allowedEndSalida: 0,
      earlyExit: false,
      breakStart: 0,
      breakEnd: 0,
      graceMinutes: 0
    });

    const tipes: object[] = []
    registros?.map((reg: any) => {
      tipes.push({
        tipo: reg.tipo,
        reg
      });
    })

    const existeDescansoSalida: any = tipes.filter((reg2: any) => reg2.tipo == 'Salida de almuerzo')
    const existeDescansoEntrada: any = tipes.filter((reg2: any) => reg2.tipo == 'Entrada de almuerzo')

    const existeEntrada: any = tipes.filter((reg2: any) => reg2.tipo == 'Entrada temprano' || reg2.tipo == 'Entrada normal' || reg2.tipo == 'Entrada tarde');
    const existeSalida: any = tipes.filter((reg2: any) => reg2.tipo == 'Salida' || reg2.tipo == 'Salida temprana');

    if (existeDescansoSalida.length > 0 && existeDescansoEntrada.length > 0) {
      setValoresLineaTiempo((prev) => ({
        ...prev,
        breakStart: horaToDecimal(existeDescansoSalida[0].reg?.hora),
        breakEnd: horaToDecimal(existeDescansoEntrada[0].reg?.hora)
      }))

    }

     if (existeEntrada.length > 0 && existeSalida.length > 0) {
      setValoresLineaTiempo((prev) => ({
        ...prev,
        start: horaToDecimal(existeEntrada[0].reg?.hora),
        end: horaToDecimal(existeSalida[0].reg?.hora)
      }))

    }

  }, [registros])

  const percentPerHour = 100 / 24; // Preciso: 4.166666666666667

  // const grace = (graceMinutes ?? 10) / 60; // ejemplo: 10 minutos = 0.1667 horas

  const adjustedStartMin = valoresLineaTiempo.start; // margen antes de la entrada
  const adjustedEndMax = valoresLineaTiempo.end;

  return (
    <div className="timeline-container">
      <div className='ruler'>
        {Array.from({ length: 13 }).map((_, i) => {
          const hour = i * 2;
          const label = hour === 24 ? '24:00' : hour.toString().padStart(2, '0');
          return (
            <div key={hour} className='rulerMark'>
              {label}
            </div>
          );
        })}
      </div>

      <div className="timeline">
        {/* Hora válida de entrada/salida */}


        {/* Tiempo de trabajo */}
        {valoresLineaTiempo.earlyExit && (
          <div
            className="grace-window"
            style={{
              left: `${adjustedStartMin * percentPerHour}%`,
              width: `${(adjustedEndMax - adjustedStartMin) * percentPerHour}%`
            }}
          ></div>
        )}
        {valoresLineaTiempo.breakStart !== undefined && valoresLineaTiempo.breakEnd !== undefined && (
          <div
            className="break-time"
            style={{
              left: `${valoresLineaTiempo.breakStart * percentPerHour}%`,
              width: `${(valoresLineaTiempo.breakEnd - valoresLineaTiempo.breakStart) * percentPerHour}%`
            }} title='Descanso'
          ></div>
        )}
        <div
          className={`work-time ${valoresLineaTiempo.earlyExit ? 'early-exit' : ''}`}
          style={{
            left: `${valoresLineaTiempo.start * percentPerHour}%`,
            width: `${(valoresLineaTiempo.end - valoresLineaTiempo.start) * percentPerHour}%`
          }} title='tiempo trabajado'
        ></div>
      </div>

      <br />

      <div className='ruler'>
        {Array.from({ length: 13 }).map((_, i) => {
          const hour = i * 2;
          const label = hour === 24 ? '24:00' : hour.toString().padStart(2, '0');
          return (
            <div key={hour} className='rulerMark'>
              {label}
            </div>
          );
        })}
      </div>

      {/* Etiquetas */}
      <div className="legend">
        <div><span className="box orange"></span>Hora válida de registro de entrada/salida</div>
        <div><span className="box blue"></span>Tiempo de trabajo</div>
        <div><span className="box striped"></span>Salida tardía/anticipada permitida</div>
        <div><span className="box gray"></span>Descanso</div>
      </div>
    </div>
  );
};
