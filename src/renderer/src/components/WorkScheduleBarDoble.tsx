import React, { useEffect, useState } from 'react';
import '../css/workScheduleBar.css';
import { Props, Props2 } from '@renderer/typesTS';
import { horaToDecimal } from '@renderer/scripts/horaDecimal';
import { calcularHorasTrabajadas } from '@renderer/scripts/calcularHorasTrabajadas';

export const WorkScheduleBarDoble: React.FC<Props2> = ({ registros }: any) => {
  const [horario, setHorario] = useState<any>({});
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
    graceMinutes: 0,
    horaInicioSinFormatear: '',
    horaFinSinFormatear: '',
    horaInicioAlmuerzoSinFormatear: '',
    horaFinAlmuerzoSinFormatear: '',
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
      graceMinutes: 0,
      horaInicioSinFormatear: '',
      horaFinSinFormatear: '',
      horaInicioAlmuerzoSinFormatear: '',
      horaFinAlmuerzoSinFormatear: '',
    });

    const tipes: any = []
    registros?.map((reg: any) => {
      tipes.push({
        tipo: reg.tipo,
        reg
      });
    })

    const existeDescansoSalida: any = tipes.filter((reg2: any) => reg2.tipo == 'Salida de almuerzo')
    const existeDescansoEntrada: any = tipes.filter((reg2: any) => reg2.tipo == 'Entrada de almuerzo')

    setHorario(tipes[0]?.reg.horario);

    const existeEntrada: any = tipes.filter((reg2: any) => reg2.tipo == 'Entrada temprano' || reg2.tipo == 'Entrada normal' || reg2.tipo == 'Entrada tarde');
    const existeSalida: any = tipes.filter((reg2: any) => reg2.tipo == 'Salida' || reg2.tipo == 'Salida temprana');

    if (existeDescansoSalida.length > 0 && existeDescansoEntrada.length > 0) {
      console.log(existeDescansoSalida[0].reg?.hora)
      setValoresLineaTiempo((prev) => ({
        ...prev,
        breakStart: horaToDecimal(existeDescansoSalida[0].reg?.hora),
        breakEnd: horaToDecimal(existeDescansoEntrada[0].reg?.hora),
        horaInicioAlmuerzoSinFormatear: existeDescansoSalida[0].reg?.hora,
        horaFinAlmuerzoSinFormatear: existeDescansoEntrada[0].reg?.hora,
      }))

    }

    if (existeEntrada.length > 0 && existeSalida.length > 0) {
      console.log(existeEntrada[0].reg?.hora)

      setValoresLineaTiempo((prev) => ({
        ...prev,
        start: horaToDecimal(existeEntrada[0].reg?.hora),
        end: horaToDecimal(existeSalida[0].reg?.hora),
        horaInicioSinFormatear: existeEntrada[0].reg?.hora,
        horaFinSinFormatear: existeSalida[0].reg?.hora,
      }))

    }

  }, [registros])

  const percentPerHour = 100 / 24; // Preciso: 4.166666666666667


  const adjustedStartMin = horaToDecimal(horario?.entrada) - (horario?.margen / 60); // margen antes de la entrada
  const adjustedEndMax = horaToDecimal(horario?.salida) + (horario?.margen / 60);

  return (
    <div className="timeline-container">
      <span>Horas trabajadas: {
        valoresLineaTiempo ? calcularHorasTrabajadas(valoresLineaTiempo.horaInicioSinFormatear, valoresLineaTiempo.horaFinSinFormatear, valoresLineaTiempo.horaInicioAlmuerzoSinFormatear,
          valoresLineaTiempo.horaFinAlmuerzoSinFormatear) : null}</span>
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


      {
        horario != undefined ?
          <>
            <span>Horas a trabajar: {calcularHorasTrabajadas(horario.entrada, horario.salida, horario.salidaAlmuerzo, horario.entradaAlmuerzo)}</span>
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
              <div
                className="valid-time"
                style={{
                  left: `${horaToDecimal(horario.entradaValida) * percentPerHour}%`,
                  width: `${(horaToDecimal(horario.entradaValidaHasta) - horaToDecimal(horario.entradaValida)) * percentPerHour}%`
                }} title='entrada valida'
              ></div>

              <div
                className="valid-time"
                style={{
                  left: `${horaToDecimal(horario.salidaValida) * percentPerHour}%`,
                  width: `${(horaToDecimal(horario.salidaValidaHasta) - horaToDecimal(horario.salidaValida)) * percentPerHour}%`
                }} title='Salida valida'
              ></div>

              {true && (
                <div
                  className="grace-window"
                  style={{
                    left: `${adjustedStartMin * percentPerHour}%`,
                    width: `${(adjustedEndMax - adjustedStartMin) * percentPerHour}%`
                  }} title='Margen permitido'
                ></div>
              )}
              {horaToDecimal(horario.salidaAlmuerzo) !== undefined && horaToDecimal(horario.entradaAlmuerzo) !== undefined && (
                <div
                  className="break-time"
                  style={{
                    left: `${horaToDecimal(horario.salidaAlmuerzo) * percentPerHour}%`,
                    width: `${(horaToDecimal(horario.entradaAlmuerzo) - horaToDecimal(horario.salidaAlmuerzo)) * percentPerHour}%`
                  }} title='Descanso'
                ></div>
              )}
              <div
                className={`work-time ${true ? 'early-exit' : ''}`}
                style={{
                  left: `${horaToDecimal(horario.entrada) * percentPerHour}%`,
                  width: `${(horaToDecimal(horario.salida) - horaToDecimal(horario.entrada)) * percentPerHour}%`
                }} title='Tiempo trabajado'
              ></div>
            </div>
          </> : null
      }



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
