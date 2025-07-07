import { ActiveSubMenuDeleteUsers, ActiveSubMenuEmpleado } from '@renderer/actions/actionsLogin';
import { formatearFecha } from '@renderer/scripts/convertirFecha';
import { formatearNumero } from '@renderer/scripts/formatearNumero';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function DataUser({ userContrato, userCargo, activeNewEmpleado, activeEdition, empleadores }) {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const [loader, setLoader] = useState<boolean>(false);

  const contFilter = userContrato.find((c, i) => {
    if (c.estado == 'Activo') {
      return c
    }
  })

  
  const contFilterEmpleador = empleadores.find((e, i) => {
    if (e.id_empleador === contFilter.id_empleador) {
      return e
    }
  })

  const GenerarContrato = async () => {
    setLoader(true);

    const response = await fetch('/api/generar-contrato', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: `${activeNewEmpleado.user.nombres} ${activeNewEmpleado.user.apellidos}`,
        cedula: activeNewEmpleado.user.cedula,
        direccion: activeNewEmpleado.user.direccion,
        cargo: userCargo.filter((item) => item.id_cargo == contFilter.id_cargo)[0].nombre_cargo,
        correo: activeNewEmpleado.user.correo,
        salario: formatearNumero(String(contFilter.salario)),
        fecha_inicio: formatearFecha(contFilter.fecha_inicio.toString().split('T')[0]),
        fecha_fin: contFilter.fecha_fin ? formatearFecha(contFilter.fecha_fin.toString().split('T')[0]) : 'INDEFINIDO',
        fechaNacimiento: formatearFecha(activeNewEmpleado.user.fecha_nacimiento.toString().split('T')[0]),
        lugarNacimiento: activeNewEmpleado.user.lugar_nacimiento.split(',').slice(0, -1),
        gentilicio: activeNewEmpleado.user.lugar_nacimiento.split(',').at(-1),
        nombre_empleador: contFilterEmpleador.nombre_empleador,
        nit:contFilterEmpleador.nit,
        direccion_empleador:contFilterEmpleador.direccion_empleador,
        reqUser: userData
      }),
    });
    const blob = await response.blob();
    setLoader(false);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contrato?${activeNewEmpleado.user.nombres}_${contFilter.id_contrato}.pdf`;
    a.click();
  };

  return (
    <>
      <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__dataUser'>
        <h2>Información laboral</h2>
        <br />
        <span>Empleador: <b>{contFilterEmpleador?.nombre_empleador}</b></span>
        <span>Tipo de contrato: <b>{contFilter.tipo_contrato}</b></span>
        <span>Fecha de inicio: <b>{contFilter.fecha_inicio.toString().split('T')[0]}</b></span>
        {
          contFilter.fecha_fin ? <span>Fecha de finalización: <b>{contFilter.fecha_fin.toString().split('T')[0]}</b></span> : null
        }
        <span>Numero de contrato: <b>{contFilter.id_contrato}</b></span>
        <span>Estado: <b>{contFilter.estado}</b></span>
        <span>Salario: <b>{formatearNumero(String(contFilter.salario))}</b></span>
        {
          contFilter?.tipo_contrato == 'Fijo' ? <>
            <span>Prórroga: <b>{contFilter.cantidad_prorrogas}</b></span>
            <span>Meses: <b>{contFilter.meses}</b></span>
          </> : null
        }
        <span>Cargo: <b>{userCargo?.map((item) => (
          item.id_cargo == contFilter.id_cargo ? item.nombre_cargo : null
        ))}</b></span>
      </div>
      <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs'>
        <h2 className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs__title'>Opciones de contrato</h2>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        {
          contFilter.tipo_contrato == 'Fijo' ? <button type='submit' disabled={activeEdition}>Prórroga</button> : null
        }
        <input type="button" value="Finalizar contrato" className='App__dashboard__contPageOutlet__PageUsers__newUser__active__btnRemove' onClick={() => {
          dispatch(ActiveSubMenuEmpleado({ user: activeNewEmpleado.user, subMenuEmpleado: false }))
          dispatch(ActiveSubMenuDeleteUsers({ user: contFilter, activeDeleteUsers: true, typeRemove: 'Contrato' }));
        }} />
        <input type="button" value={loader ? 'Generando archivo...' : "Descargar contrato"} disabled={loader} className='App__dashboard__contPageOutlet__PageUsers__newUser__active__btnSubmit'
          onClick={() => GenerarContrato()} />
      </div>
    </>
  );
}

export default DataUser;