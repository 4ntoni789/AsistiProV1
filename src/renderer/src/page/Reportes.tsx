import React, { useEffect, useState } from 'react';
import '../css/reporte.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { obtenerSemanaSiEsLunes } from '@renderer/scripts/calcularLunesYDomingo';
import { ActiveErrorSpam } from '@renderer/actions/actionsLogin';
import ContenedorReportes from '@renderer/components/ContenedorReportes';
import FormularioReportSeleccionado from '@renderer/components/FormularioReportSeleccionado';
import { obtenerRangoDelMesSiEsPrimerDia } from '@renderer/scripts/calcularInicio&FinDeMes';

function Reportes(props) {
  const [seleted, setSeleted] = useState<string>('');
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);
  const userData = useSelector((state: any) => state.loginAccess);
  const { register, handleSubmit, reset } = useForm();
  const [puntosVenta, setPuntosVenta] = useState<[any]>([{}]);
  const dispatch = useDispatch();
  const [empleados, setEmpleados] = useState<[any]>([{}]);

  const onSubmit = async (dataInput) => {
    try {
      const fechaIniSemana: any = obtenerSemanaSiEsLunes(dataInput.fecha_inicio);
      const fechaIniMes: any = obtenerRangoDelMesSiEsPrimerDia(dataInput.fecha_inicio);
      let fechaFin;
      let idEmpleado = null;
      if (seleted == 'Asistencia semanal' && fechaIniSemana != null) {
        fechaFin = fechaIniSemana.domingo
      } else if (seleted == 'Asistencia diaria') {
        fechaFin = dataInput.fecha_inicio
      } else if (seleted == 'Asistencia general') {
        fechaFin = dataInput.fecha_fin
      } else if (seleted == 'Asistencia mensual' && fechaIniMes != null) {
        fechaFin = fechaIniMes.finMes
      } else if (fechaIniMes == null && seleted == 'Asistencia mensual') {
        dispatch(ActiveErrorSpam({ msg: 'Tienes que ingresar el primer dia del mes para procesar este reporte', active: true, typeError: 'error' }));
      } else if (fechaIniSemana == null && seleted == 'Asistencia semanal') {
        dispatch(ActiveErrorSpam({ msg: 'Tienes que ingresar un lunes para procesar este reporte', active: true, typeError: 'error' }));
      } else if (seleted == 'Asistencias por empleado') {
        fechaFin = dataInput.fecha_fin
        idEmpleado = dataInput.id_empleado;
      }
      const response = await fetch(`/api/generar-reporte`, {
        method: 'POST',
        headers: {
          'x-id-usuario': userId,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fecha_ini: dataInput.fecha_inicio,
          fecha_fin: fechaFin,
          id_pv: dataInput.punto_venta,
          type_report: seleted,
          id_empleado: idEmpleado,
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
        a.download = `asistencias_${dataInput.punto_venta}_${seleted}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.log(error);
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

    fetch('/api/empleados', {
      headers: {
        'x-id-usuario': userId
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setEmpleados(data);
      })
      .catch((err) => console.error('Error:', err));
  }, [userData.validationAccess == true, seleted]);

  return (
    <div className='App__init__puntoVenta'>
      <ContenedorReportes seleted={seleted} setSeleted={setSeleted} />
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
          {
            seleted == 'Asistencias por empleado' ?
              <>
                <span>Punto de venta: </span>
                <select id='punto_venta' {...register('punto_venta',
                  { required: true, disabled: false })}>
                  <option value='todos'>Todos los puntos de venta</option>
                  {
                    puntosVenta?.map((item, i) => (
                      <option key={i} value={item.id_pv}>{item.nombre}</option>
                    ))
                  }
                </select><br />
                <span> Empleado: </span>
                <select id='id_empleado' {...register('id_empleado',
                  { required: true, disabled: false })}>
                  <option value='todos'>Escoge un empleado....</option>
                  {
                    empleados?.map((item, i) => (
                      <option key={i} value={item.id_empleado}>{item.nombres} {item.apellidos}</option>
                    ))
                  }
                </select>
              </>
              :
              <>
                <span>Punto de venta: </span>
                <select id='punto_venta' {...register('punto_venta',
                  { required: true, disabled: seleted == '' ? true : false })}>
                  <option value='todos'>Todos los puntos de venta</option>
                  {
                    puntosVenta?.map((item, i) => (
                      <option key={i} value={item.id_pv}>{item.nombre}</option>
                    ))
                  }
                </select></>
          }<br />
          <span>Tipo de archivo: </span>
          <select id='tipo_archivo' {...register('tipo_archivo',
            { required: true, disabled: seleted == '' ? true : false })}>
            <option value='pdf'>PDF</option>
            <option value='excel'>EXCEL</option>
          </select><br />
          <FormularioReportSeleccionado seleted={seleted} register={register} />
          <button disabled={seleted == '' ? true : false}>Generar</button>

        </form>
      </div>
    </div >
  );
}

export default Reportes;