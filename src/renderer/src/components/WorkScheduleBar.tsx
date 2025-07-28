import React from 'react';
import '../css/workScheduleBar.css';
import { Props } from '@renderer/typesTS';

export const WorkScheduleBar: React.FC<Props> = ({ start, end, allowedStartEntrada, allowedEndEntrada, allowedStartSalida, allowedEndSalida, earlyExit, breakStart, breakEnd, graceMinutes }: any) => {
  const percentPerHour = 100 / 24;

  const grace = (graceMinutes ?? 10) / 60; 

  const adjustedStartMin = start - grace;
  const adjustedEndMax = end + grace;

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
        <div
          className="valid-time"
          style={{
            left: `${allowedStartEntrada * percentPerHour}%`,
            width: `${(allowedEndEntrada - allowedStartEntrada) * percentPerHour}%`
          }} title='Entrada valida'
        ></div>

        <div
          className="valid-time"
          style={{
            left: `${allowedStartSalida * percentPerHour}%`,
            width: `${(allowedEndSalida - allowedStartSalida) * percentPerHour}%`
          }} title='Salida valida'
        ></div>



        {/* Tiempo de trabajo */}
        {earlyExit && (
          <div
            className="grace-window"
            style={{
              left: `${adjustedStartMin * percentPerHour}%`,
              width: `${(adjustedEndMax - adjustedStartMin) * percentPerHour}%`
            }} title='Margen permitido'
          ></div>
        )}
        {breakStart !== undefined && breakEnd !== undefined && (
          <div
            className="break-time"
            style={{
              left: `${breakStart * percentPerHour}%`,
              width: `${(breakEnd - breakStart) * percentPerHour}%`
            }} title='Descanso'
          ></div>
        )}
        <div
          className={`work-time ${earlyExit ? 'early-exit' : ''}`}
          style={{
            left: `${start * percentPerHour}%`,
            width: `${(end - start) * percentPerHour}%`
          }} title='Tiempo trabajado'
        ></div>
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
