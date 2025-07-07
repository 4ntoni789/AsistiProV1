import MarcacionesEnDirecto from '@renderer/components/MarcacionesEnDirecto';
import TablaDeMarcaciones from '@renderer/components/tablas/TablaDeEmpleadosMarcaciones';
import React, { useEffect } from 'react';
import '../css/inicio.css';
import '../css/empleados.css';
import ButtonStyle from '@renderer/components/ButtonStyle';
import { useDispatch, useSelector } from 'react-redux';
import { ActiveSubMenuNewEmpleado } from '@renderer/actions/actionsLogin';
import NewEmpleado from '@renderer/components/modal/NewEmpleado';

function Empleados(props) {
  // const type_role = useSelector((state: any) => state.loginAccess.userLogin.type_role);
  const dispatch = useDispatch();
  
  return (
    <div className='App__init'>
      <div className='App__init__encabezado'>
        <h2>Empleados</h2>
        <div className='App__init__encabezado__btnEmpleados'>
          <ButtonStyle funtion={() => dispatch(ActiveSubMenuNewEmpleado({ user: {}, activeNewEmpleado: true }))} disabled={false} nameBtn='Nuevo Empleado' />
        </div>
      </div>
      <div className='App__init__contTable'>
        <TablaDeMarcaciones />
        <MarcacionesEnDirecto />
      </div>
      <NewEmpleado />
    </div>
  );
}

export default Empleados;