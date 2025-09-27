import { useEffect, useState } from 'react';
import '../../css/deleteUser.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '@renderer/actions/actionsLogin';
import { extraerHora } from '@renderer/scripts/extraerHora';
import { ActiveSubMenuDeleteUsers, Fetch_delete_user } from '@renderer/actions/actionsUsers';
import { AppDispatch } from '@renderer/store';
import { Fetch_delete_empleado } from '@renderer/actions/actionsEmpleados';
import { Fetch_desactivar_contrato } from '@renderer/actions/actionsContratos';
import { Fetch_delete_cargo } from '@renderer/actions/actionsCargos';
import { Fetch_delete_role } from '@renderer/actions/actionsRoles';
import { Fetch_delete_punto_venta } from '@renderer/actions/actionsPuntoDeVenta';
import { Fetch_delete_empleador } from '@renderer/actions/actionsEmpleadores';
import { Fetch_delete_horario } from '@renderer/actions/actionsHorario';

function DeleteUser() {
  const activeDeleteUsers = useSelector((state: any) => state.menuAccions.deleteUser);
  const [nameDelete, setNameDelete] = useState<string>('');
  const [btnName, setBtnName] = useState<string>('');
  const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const dispatch = useDispatch<AppDispatch>();

  const ress = () => {
    if (activeDeleteUsers.typeRemove == 'Usuario') {
      dispatch(Fetch_delete_user(activeDeleteUsers, userData));
    } else if (activeDeleteUsers.typeRemove == 'Empleado') {
      dispatch(Fetch_delete_empleado(activeDeleteUsers, userData));
    } else if (activeDeleteUsers.typeRemove == 'Contrato') {
      dispatch(Fetch_desactivar_contrato(activeDeleteUsers, userData));
    } else if (activeDeleteUsers.typeRemove == 'Cargo') {
      dispatch(Fetch_delete_cargo(activeDeleteUsers, userData));
    } else if (activeDeleteUsers.typeRemove == 'Rol') {
      dispatch(Fetch_delete_role(activeDeleteUsers, userData));
    } else if (activeDeleteUsers.typeRemove == 'Logout') {
      dispatch(Logout());
      dispatch(ActiveSubMenuDeleteUsers({
        user: {},
        activeDeleteUsers: false,
        typeRemove: ''
      }));
    } else if (activeDeleteUsers.typeRemove == 'Punto-venta') {
      dispatch(Fetch_delete_punto_venta(activeDeleteUsers, userData));
    } else if (activeDeleteUsers.typeRemove == 'Empleador') {
      dispatch(Fetch_delete_empleador(activeDeleteUsers, userData));
    } else if (activeDeleteUsers.typeRemove == 'Horario') {
      dispatch(Fetch_delete_horario(activeDeleteUsers, userData));
    }
  }

  useEffect(() => {
    if (activeDeleteUsers.typeRemove == 'Usuario') {
      setNameDelete(`eliminar el ${activeDeleteUsers.typeRemove}: ${activeDeleteUsers.user.nombre_usuario}`);
      setBtnName('Eliminar');
    } else if (activeDeleteUsers.typeRemove == 'Empleado') {
      setNameDelete(`eliminar el ${activeDeleteUsers.typeRemove}: ${activeDeleteUsers.user.nombres}`);
      setBtnName('Eliminar');
    } else if (activeDeleteUsers.typeRemove == 'Contrato') {
      setNameDelete(`inhabilitar el ${activeDeleteUsers.typeRemove}: ${String(activeDeleteUsers.user.id_contrato)}`);
      setBtnName('Inhabilitar');
    } else if (activeDeleteUsers.typeRemove == 'Cargo') {
      setNameDelete(`eliminar el ${activeDeleteUsers.typeRemove}: ${activeDeleteUsers.user.nombre_cargo}`);
      setBtnName('Eliminar');
    } else if (activeDeleteUsers.typeRemove == 'Rol') {
      setNameDelete(`eliminar el ${activeDeleteUsers.typeRemove}: ${activeDeleteUsers.user.nombre_rol}`);
      setBtnName('Eliminar');
    } else if (activeDeleteUsers.typeRemove == 'Logout') {
      setNameDelete(`Cerrar sesión`);
      setBtnName('Cerrar Sesion');
    } else if (activeDeleteUsers.typeRemove == 'Punto-venta') {
      setNameDelete(`eliminar el punto de venta: ${activeDeleteUsers.user.nombre}`);
      setBtnName('Eliminar');
    } else if (activeDeleteUsers.typeRemove == 'Empleador') {
      setNameDelete(`eliminar este empleador: ${activeDeleteUsers.user.nombre_empleador}`);
      setBtnName('Eliminar');
    } else if (activeDeleteUsers.typeRemove == 'Horario') {
      setNameDelete(`eliminar este horario: ${activeDeleteUsers.user.dia_semana} - De ${extraerHora(activeDeleteUsers.user.hora_entrada)} a ${extraerHora(activeDeleteUsers.user.hora_salida)}`);
      setBtnName('Eliminar');
    }
  }, [activeDeleteUsers])

  return (
    <div className={activeDeleteUsers.activeDeleteUsers ? 'App__dashboard__contPageOutlet__PageUsers__deleteUser__active' : 'App__dashboard__contPageOutlet__PageUsers__deleteUser'}>
      <div className='App__dashboard__contPageOutlet__PageUsers__deleteUser__contDeleteUser'>
        <div className='App__dashboard__contPageOutlet__PageUsers__deleteUser__contDeleteUser__headerDeleteUser'>
          <FontAwesomeIcon icon={faXmark} onClick={() => dispatch(ActiveSubMenuDeleteUsers({
            user: {},
            activeDeleteUsers: false,
            typeRemove: ''
          }))} />
        </div>
        <h2>Seguro que deseas {nameDelete}</h2>
        <button onClick={ress}>{btnName}</button>
      </div>
    </div>
  );
}

export default DeleteUser;