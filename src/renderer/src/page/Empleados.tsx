import MarcacionesEnDirecto from '@renderer/components/MarcacionesEnDirecto';
import TablaDeMarcaciones from '@renderer/components/tablas/TablaDeEmpleadosMarcaciones';
import '../css/inicio.css';
import '../css/empleados.css';
import ButtonStyle from '@renderer/components/ButtonStyle';
import { useDispatch, useSelector } from 'react-redux';
import { ActiveSubMenuNewEmpleado } from '@renderer/actions/actionsLogin';
import NewEmpleado from '@renderer/components/modal/NewEmpleado';
import { useEffect } from 'react';

function Empleados(props) {
  // const type_role = useSelector((state: any) => state.loginAccess.userLogin.type_role);
  const dispatch = useDispatch();
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);

  return (
    <div className='App__init'>
      <div className='App__init__contTable'>
        <TablaDeMarcaciones />
        <MarcacionesEnDirecto />
      </div>
      <NewEmpleado />
    </div>
  );
}

export default Empleados;