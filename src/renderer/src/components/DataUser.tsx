import { Fetch_generar_contrato } from '@renderer/actions/actionsContratos';
import { ActiveSubMenuEmpleado } from '@renderer/actions/actionsEmpleados';
import { } from '@renderer/actions/actionsLogin';
import { ActiveSubMenuDeleteUsers } from '@renderer/actions/actionsUsers';
import { formatearNumero } from '@renderer/scripts/formatearNumero';
import { AppDispatch } from '@renderer/store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function DataUser({ userContrato, userCargo, activeNewEmpleado, activeEdition, empleadores }) {
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const [loader, setLoader] = useState<boolean>(false);
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);

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
    dispatch(Fetch_generar_contrato(activeNewEmpleado, userCargo, contFilter, contFilterEmpleador, userData, setLoader, userId))
  };

  return (
    <>
      <div className='App__dashboard__contPageOutlet__PageUsers__menuUser__contDataUser__dataUser'>
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