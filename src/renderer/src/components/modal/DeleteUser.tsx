import React, { useEffect, useState } from 'react';
import '../../css/deleteUser.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { ActiveErrorSpam, ActiveSubMenu, ActiveSubMenuDeleteUsers, Logout } from '@renderer/actions/actionsLogin';
import { DeleteUserAs } from '@renderer/scripts/deleteUser';
import { DeleteEmpleadoAs } from '@renderer/scripts/deleteEmpleadoAs';
import { DesactivateContrato } from '@renderer/scripts/desactivateContrato';
import { DeleteCargo } from '@renderer/scripts/deleteCargo';
import { DeleteRol } from '@renderer/scripts/deleteRol';
import { DeletePuntoVenta } from '@renderer/scripts/deletePuntoVenta';
import { DeleteEmpleador } from '@renderer/scripts/deleteEmpleador';
import { extraerHora } from '@renderer/scripts/extraerHora';
import { DeleteHorario } from '@renderer/scripts/deleteHorario';

function DeleteUser() {
  const activeDeleteUsers = useSelector((state: any) => state.menuAccions.deleteUser);
  const [nameDelete, setNameDelete] = useState<string>('');
  const [btnName, setBtnName] = useState<string>('');
  const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const dispatch = useDispatch();

  const ress = () => {
    if (activeDeleteUsers.typeRemove == 'Usuario') {
      DeleteUserAs(activeDeleteUsers, userData)
        .then((data) => {
          dispatch(ActiveSubMenuDeleteUsers({
            user: {},
            activeDeleteUsers: false
          }))
          dispatch(ActiveErrorSpam(data))
        })
    } else if (activeDeleteUsers.typeRemove == 'Empleado') {
      DeleteEmpleadoAs(activeDeleteUsers, userData)
        .then((data) => {
          dispatch(ActiveSubMenuDeleteUsers({
            user: {},
            activeDeleteUsers: false
          }))
          dispatch(ActiveErrorSpam(data))
        })
    } else if (activeDeleteUsers.typeRemove == 'Contrato') {
      DesactivateContrato(activeDeleteUsers, userData)
        .then((data) => {
          dispatch(ActiveSubMenuDeleteUsers({
            user: {},
            activeDeleteUsers: false
          }))
          dispatch(ActiveErrorSpam(data));
        })
    } else if (activeDeleteUsers.typeRemove == 'Cargo') {
      DeleteCargo(activeDeleteUsers, userData)
        .then((data) => {
          dispatch(ActiveSubMenuDeleteUsers({
            user: {},
            activeDeleteUsers: false
          }))
          dispatch(ActiveErrorSpam(data));
        })
    } else if (activeDeleteUsers.typeRemove == 'Rol') {
      DeleteRol(activeDeleteUsers, userData)
        .then((data) => {
          dispatch(ActiveSubMenuDeleteUsers({
            user: {},
            activeDeleteUsers: false
          }))
          dispatch(ActiveErrorSpam(data));
        })
    } else if (activeDeleteUsers.typeRemove == 'Logout') {
      dispatch(Logout());
      dispatch(ActiveSubMenuDeleteUsers({
        user: {},
        activeDeleteUsers: false,
        typeRemove: ''
      }));
    } else if (activeDeleteUsers.typeRemove == 'Punto-venta') {
      DeletePuntoVenta(activeDeleteUsers.user, userData)
        .then((data) => {
          dispatch(ActiveSubMenuDeleteUsers({
            user: {},
            activeDeleteUsers: false
          }))
          dispatch(ActiveErrorSpam(data));
        });
    } else if (activeDeleteUsers.typeRemove == 'Empleador') {
      DeleteEmpleador(activeDeleteUsers.user, userData)
        .then((data) => {
          dispatch(ActiveSubMenuDeleteUsers({
            user: {},
            activeDeleteUsers: false
          }))
          dispatch(ActiveErrorSpam(data));
        });
    } else if (activeDeleteUsers.typeRemove == 'Horario') {
      DeleteHorario(activeDeleteUsers.user, userData)
        .then((data) => {
          dispatch(ActiveSubMenuDeleteUsers({
            user: {},
            activeDeleteUsers: false
          }))
          dispatch(ActiveErrorSpam(data));
        });
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
      setNameDelete(`cerrar sesion`);
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