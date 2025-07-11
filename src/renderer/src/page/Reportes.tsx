import React, { useEffect, useState } from 'react';
import '../css/reporte.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { typeReports } from '../typeReport/index'

function Reportes(props) {
  const [seleted, setSeleted] = useState<string>('');
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);
  const userData = useSelector((state: any) => state.loginAccess);
  const { register, handleSubmit, reset } = useForm();
  const [puntosVenta, setPuntosVenta] = useState<[any]>([{}]);

  const onSubmit = async (dataInput) => {
    const response = await fetch(`/api/generar-reporte`, {
      method: 'POST',
      headers: {
        'x-id-usuario': userId,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fecha_ini: dataInput.fecha_inicio,
        fecha_fin: dataInput.fecha_fin,
        id_pv: dataInput.punto_venta,
        type_report: seleted,
        type_archive: dataInput.tipo_archivo,
        reqUser: userData.userLogin
      }),
    });

    if (!response.ok) throw new Error('Error al generar este archivo');

    if (dataInput.tipo_archivo == 'excel') {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reporte_asistencias_${dataInput.punto_venta}_${seleted}.xlsx`;
      a.click();
    } else {
       const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'asistencias.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
    }
  }

  useEffect(() => {
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
  }, [userData.validationAccess == true, seleted]);

  return (
    <div className='App__init__puntoVenta'>
      <div className='App__init__puntoVenta__encabezado'>
        <h2>Reportes de Período</h2>
      </div>
      <div className='App__init__Reporte'>
        {
          typeReports.map((report: any, i) => (
            report.typeReport == 'general' ? <div key={i} className={seleted == report.reportName ? 'App__init__Reporte__contSingleReporte__active' : 'App__init__Reporte__contSingleReporte'}
              onClick={() => setSeleted(report.reportName)}>
              <FontAwesomeIcon icon={report.icon} />
              <span>{report.reportName}</span>
            </div> : null
          ))
        }
      </div>
      <div className='App__init__puntoVenta__encabezado'>
        <h2>Reportes de Control y Análisis</h2>
      </div>
      <div className='App__init__Reporte'>
        {
          typeReports.map((report: any, i) => (
            report.typeReport == 'control_analisis' ? <div key={i} className={seleted == report.reportName ? 'App__init__Reporte__contSingleReporte__active' : 'App__init__Reporte__contSingleReporte'}
              onClick={() => setSeleted(report.reportName)}>
              <FontAwesomeIcon icon={report.icon} />
              <span>{report.reportName}</span>
            </div> : null
          ))
        }
      </div>
      <br />
      <div className='App__init__puntoVenta__encabezado'>
        <h2>Generador de reporte</h2>
      </div>
      <div className='App__init__Reporte__tipoReporte'>
        <div className='App__init__Reporte__tipoReporte__contBtnFlotante'>
          <FontAwesomeIcon icon={faTrash} title='Limpiar' onClick={() => setSeleted('')} />
        </div>
        <h3>Tipo de reporte: <b>{seleted != '' ? seleted : 'Escoge un tipo de informe'}</b></h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <span>Punto de venta: </span>
          <select id='punto_venta' {...register('punto_venta',
            { required: true, disabled: seleted == '' ? true : false })}>
            <option value=''>--Escoge un punto de venta--</option>
            {
              puntosVenta?.map((item, i) => (
                <option key={i} value={item.id_pv}>{item.nombre}</option>
              ))
            }
          </select><br />
          <span>Tipo de archivo: </span>
          <select id='tipo_archivo' {...register('tipo_archivo',
            { required: true, disabled: seleted == '' ? true : false })}>
            <option value='pdf'>PDF</option>
            <option value='excel'>EXCEL</option>
          </select><br />
          {
            seleted == 'Asistencias general' ?
              <>
                <span>Fecha de inicio: </span>
                <input type="date" id='fecha_inicio' {...register('fecha_inicio',
                  { required: true, disabled: false })} />
                <span>Fecha de fin: </span>
                <input type="date" id='fecha_fin' {...register('fecha_fin',
                  { required: true, disabled: false })} />
                <button disabled={false}>Generar</button>
              </>
              :
              seleted == 'Asistencias diaria' ?
                <>
                  <span>Fecha de inicio: </span>
                  <input type="date" id='fecha_inicio' {...register('fecha_inicio',
                    { required: true, disabled: false })} />
                  <button disabled={false}>Generar</button>
                </>
                : <>
                  <span>Fecha de inicio: </span>
                  <input type="date" id='fecha_inicio' {...register('fecha_inicio',
                    { required: true, disabled: seleted == '' ? true : false })} />
                  <span>Fecha de fin: </span>
                  <input type="date" id='fecha_fin' {...register('fecha_fin',
                    { required: true, disabled: seleted == '' ? true : false })} />
                  <button disabled={seleted == '' ? true : false}>Generar</button>
                </>
          }
        </form>
      </div>
    </div>
  );
}

export default Reportes;