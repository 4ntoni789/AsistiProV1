import React, { useEffect, useState } from 'react';
import '../css/reporte.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCalendar, faCalendarDay, faCalendarDays, faCalendarWeek, faCalendarXmark, faClockFour, faFileExport, faRightFromBracket, faShuffle, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

function Reportes(props) {
  const [seleted, setSeleted] = useState<string>('');
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);
  const userData = useSelector((state: any) => state.loginAccess.validationAccess);
  const { register, handleSubmit, reset } = useForm();
  const [puntosVenta, setPuntosVenta] = useState<[any]>([{}]);

  const onSubmit = async (dataInput) => {
    console.log(dataInput)
  }

  useEffect(() => {
    console.log(seleted);
    fetch('/api/puntos-venta', {
      headers: {
        'x-id-usuario': userId
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setPuntosVenta(data)
      })
      .catch((err) => console.error('Error:', err));
  }, [userData == true, seleted]);

  return (
    <div className='App__init__puntoVenta'>
      <div className='App__init__puntoVenta__encabezado'>
        <h2>Reportes de Período</h2>
      </div>
      <div className='App__init__Reporte'>
        <div className={seleted == 'Asistencias general' ? 'App__init__Reporte__contSingleReporte__active' : 'App__init__Reporte__contSingleReporte'}
          onClick={() => setSeleted('Asistencias general')} title='Informe de asistencia por punto de venta'>
          <FontAwesomeIcon icon={faFileExport} />
          <span>Asistencias general</span>
        </div>
        <div className={seleted == 'Asistencias de hoy' ? 'App__init__Reporte__contSingleReporte__active' : 'App__init__Reporte__contSingleReporte'}
          onClick={() => setSeleted('Asistencias de hoy')}>
          <FontAwesomeIcon icon={faCalendarDay} />
          <span>Asistencias de hoy</span>
        </div>
        <div className={seleted == 'Asistencias semanal' ? 'App__init__Reporte__contSingleReporte__active' : 'App__init__Reporte__contSingleReporte'}
          onClick={() => setSeleted('Asistencias semanal')}>
          <FontAwesomeIcon icon={faCalendarWeek} />
          <span>Asistencias semanal</span>
        </div>
        <div className={seleted == 'Asistencias mensual' ? 'App__init__Reporte__contSingleReporte__active' : 'App__init__Reporte__contSingleReporte'}
          onClick={() => setSeleted('Asistencias mensual')}>
          <FontAwesomeIcon icon={faCalendarDays} />
          <span>Asistencias mensual</span>
        </div>
        <div className={seleted == 'Asistencias por empleado' ? 'App__init__Reporte__contSingleReporte__active' : 'App__init__Reporte__contSingleReporte'}
          onClick={() => setSeleted('Asistencias por empleado')}>
          <FontAwesomeIcon icon={faUserTie} />
          <span>Asistencias por empleado</span>
        </div>
        <div className={seleted == 'Asistencias por turno' ? 'App__init__Reporte__contSingleReporte__active' : 'App__init__Reporte__contSingleReporte'}
          onClick={() => setSeleted('Asistencias por turno')}>
          <FontAwesomeIcon icon={faShuffle} />
          <span>Asistencias por turno</span>
        </div>
      </div>
      <div className='App__init__puntoVenta__encabezado'>
        <h2>Reportes de Control y Análisis</h2>
      </div>
      <div className='App__init__Reporte'>
        <div className={seleted == 'Ausencias' ? 'App__init__Reporte__contSingleReporte__active' : 'App__init__Reporte__contSingleReporte'}
          onClick={() => setSeleted('Ausencias')} title='Informe de asistencia por punto de venta'>
          <FontAwesomeIcon icon={faCalendarXmark} />
          <span>Ausencias</span>
        </div>
        <div className={seleted == 'Entrada tarde' ? 'App__init__Reporte__contSingleReporte__active' : 'App__init__Reporte__contSingleReporte'}
          onClick={() => setSeleted('Entrada tarde')}>
          <FontAwesomeIcon icon={faClockFour} />
          <span>Entrada tarde</span>
        </div>
        <div className={seleted == 'Entrada temprana' ? 'App__init__Reporte__contSingleReporte__active' : 'App__init__Reporte__contSingleReporte'}
          onClick={() => setSeleted('Entrada temprana')}>
          <FontAwesomeIcon icon={faBell} />
          <span>Entrada temprana</span>
        </div>
        <div className={seleted == 'Salida temprana' ? 'App__init__Reporte__contSingleReporte__active' : 'App__init__Reporte__contSingleReporte'}
          onClick={() => setSeleted('Salida temprana')}>
          <FontAwesomeIcon icon={faRightFromBracket} />
          <span>Salida temprana</span>
        </div>
      </div>
      <br />
      <div className='App__init__Reporte__tipoReporte'>
        <h3>{seleted != '' ? seleted : 'Escoge un tipo de informe'}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <span>Punto de venta: </span>
          <select id='punto_venta' {...register('punto_venta', { required: true, disabled: false })}>
            <option value=''>--Escoge un punto de venta--</option>
            {
              puntosVenta?.map((item, i) => (
                <option key={i} value={item.id_pv}>{item.nombre}</option>
              ))
            }
          </select><br />
          <span>Fecha de inicio: </span>
          <input type="date" id='fecha_inicio' {...register('fecha_inicio', { required: true, disabled: false })} />
          <span>Fecha de fin: </span>
          <input type="date" id='fecha_fin' {...register('fecha_fin', { required: true, disabled: false })} />
          <button>Generar</button>
        </form>
      </div>
    </div>
  );
}

export default Reportes;