import React, { useEffect, useState } from 'react';
import '../css/reporte.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCalendar, faCalendarDay, faCalendarDays, faCalendarWeek, faCalendarXmark, faClockFour, faFileExport, faRightFromBracket, faShuffle, faUserTie } from '@fortawesome/free-solid-svg-icons';

function Reportes(props) {
  const [seleted, setSeleted] = useState<string>('');

  useEffect(() => {
    console.log(seleted);
  }, [seleted])
  return (
    <div className='App__init__puntoVenta'>
      <div className='App__init__puntoVenta__encabezado'>
        <h2>Reportes de Período</h2>
      </div>
      <div className='App__init__Reporte'>
        <div className={seleted == 'Informe punto de venta' ? 'App__init__Reporte__contSingleReporte__active' : 'App__init__Reporte__contSingleReporte'}
          onClick={() => setSeleted('Informe punto de venta')} title='Informe de asistencia por punto de venta'>
          <FontAwesomeIcon icon={faFileExport} />
          <span>Asistencias general</span>
        </div>
        <div className={seleted == 'Informe hoy' ? 'App__init__Reporte__contSingleReporte__active' : 'App__init__Reporte__contSingleReporte'}
          onClick={() => setSeleted('Informe hoy')}>
          <FontAwesomeIcon icon={faCalendarDay} />
          <span>Asistencias de hoy</span>
        </div>
        <div className={seleted == 'Informe semanal' ? 'App__init__Reporte__contSingleReporte__active' : 'App__init__Reporte__contSingleReporte'}
          onClick={() => setSeleted('Informe semanal')}>
          <FontAwesomeIcon icon={faCalendarWeek} />
          <span>Asistencias semanal</span>
        </div>
        <div className={seleted == 'Informe mensual' ? 'App__init__Reporte__contSingleReporte__active' : 'App__init__Reporte__contSingleReporte'}
          onClick={() => setSeleted('Informe mensual')}>
          <FontAwesomeIcon icon={faCalendarDays} />
          <span>Asistencias mensual</span>
        </div>
        <div className={seleted == 'Informe empleado' ? 'App__init__Reporte__contSingleReporte__active' : 'App__init__Reporte__contSingleReporte'}
          onClick={() => setSeleted('Informe empleado')}>
          <FontAwesomeIcon icon={faUserTie} />
          <span>Asistencias por empleado</span>
        </div>
        <div className={seleted == 'Informe turno' ? 'App__init__Reporte__contSingleReporte__active' : 'App__init__Reporte__contSingleReporte'}
          onClick={() => setSeleted('Informe turno')}>
          <FontAwesomeIcon icon={faShuffle} />
          <span>Asistencias por turno</span>
        </div>
      </div>
      <div className='App__init__puntoVenta__encabezado'>
        <h2>Reportes de Control y Análisis</h2>
      </div>
      <div className='App__init__Reporte'>
        <div className={seleted == 'Informe ausencias' ? 'App__init__Reporte__contSingleReporte__active' : 'App__init__Reporte__contSingleReporte'}
          onClick={() => setSeleted('Informe ausencias')} title='Informe de asistencia por punto de venta'>
          <FontAwesomeIcon icon={faCalendarXmark} />
          <span>Ausencias</span>
        </div>
        <div className={seleted == 'Informe tarde' ? 'App__init__Reporte__contSingleReporte__active' : 'App__init__Reporte__contSingleReporte'}
          onClick={() => setSeleted('Informe tarde')}>
          <FontAwesomeIcon icon={faClockFour} />
          <span>Entrada tarde</span>
        </div>
        <div className={seleted == 'Informe temprana' ? 'App__init__Reporte__contSingleReporte__active' : 'App__init__Reporte__contSingleReporte'}
          onClick={() => setSeleted('Informe temprana')}>
          <FontAwesomeIcon icon={faBell} />
          <span>Entrada temprana</span>
        </div>
        <div className={seleted == 'Informe Stemprana' ? 'App__init__Reporte__contSingleReporte__active' : 'App__init__Reporte__contSingleReporte'}
          onClick={() => setSeleted('Informe Stemprana')}>
          <FontAwesomeIcon icon={faRightFromBracket} />
          <span>Salida temprana</span>
        </div>
      </div>
<br />
      <div className='App__init__Reporte__tipoReporte'>
          <br />
          <br />
          <br />
          <br />

      </div>
    </div>
  );
}

export default Reportes;