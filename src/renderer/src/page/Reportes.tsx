import { useEffect, useState } from 'react';
import '../css/reporte.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import ContainerReportes from '@renderer/components/ContainerReportes';
import FormularioReportSeleccionado from '@renderer/components/FormularioReportSeleccionado';
import { obtenerDatos } from '@renderer/scripts/obtenerDatosFetch';
import { AppDispatch } from '@renderer/store';
import { Fetch_empleados } from '@renderer/actions/actionsEmpleados';
import { Fetch_Punto_venta } from '@renderer/actions/actionsPuntoDeVenta';
import { UserDataType } from '@renderer/typesTS';
import { Fetch_generar_reporte } from '@renderer/actions/actionsReportes';
import DownloadButton from '@renderer/components/DowloadButton';

function Reportes(props) {
  const [seleted, setSeleted] = useState<string>('');
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);
  const userData = useSelector((state: UserDataType) => state.loginAccess);
  const { register, handleSubmit, reset } = useForm();
  const [puntosVenta, setPuntosVenta] = useState<[any]>([{}]);
  const dispatch = useDispatch<AppDispatch>();
  const [empleados, setEmpleados] = useState<[any]>([{}]);
  const [loader, setLoader] = useState<boolean>(false);

  const onSubmit = async (dataInput) => {
    dispatch(Fetch_generar_reporte(dataInput, seleted, userId, userData, setLoader))
  }

  useEffect(() => {
    obtenerDatos(dispatch(Fetch_Punto_venta(userId)), setPuntosVenta);
    obtenerDatos(dispatch(Fetch_empleados(userId)), setEmpleados);
  }, [userData.validationAccess == true, seleted]);

  return (
    <div className='App__init__Reporte'>
      <ContainerReportes seleted={seleted} setSeleted={setSeleted} />
      <br />
      <div className='App__init__Reporte__header'>
        <h2>Generador de reportes</h2>
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
          <DownloadButton functionDescargar={null} nameButton={'Generar'} load={loader} disable={seleted == '' ? true : false} />
        </form>
      </div>
    </div >
  );
}

export default Reportes;