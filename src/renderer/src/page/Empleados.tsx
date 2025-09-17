import MarcacionesEnDirecto from '@renderer/components/MarcacionesEnDirecto';
import TablaDeMarcaciones from '@renderer/components/tablas/TablaDeEmpleadosMarcaciones';
import '../css/inicio.css';
import '../css/empleados.css';
import NewEmpleado from '@renderer/components/modal/NewEmpleado';
import ModalViewRegistros from '@renderer/components/modal/ModalViewRegistros';
import MenuEmpleado from '@renderer/components/modal/SubMenuEmpleado';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@renderer/store';
import { useEffect } from 'react';
import { EliminarNotificacion } from '@renderer/actions/actionsNotificacion';

function Empleados({ }) {
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    dispatch(EliminarNotificacion('nuevas-marcaciones'));
  });

  return (
    <div className='App__init'>
      <div className='App__init__contTable'>
        <TablaDeMarcaciones />
        <MarcacionesEnDirecto />
      </div>
      <NewEmpleado />
      <MenuEmpleado />
      <ModalViewRegistros />
    </div>
  );
}

export default Empleados;