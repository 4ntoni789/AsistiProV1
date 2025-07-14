import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../css/user.css';
import ButtonStyle from '@renderer/components/ButtonStyle';
import { ActiveSubMenuDeleteUsers, ActiveSubMenuUpdatePass, ActiveSubMenuUpdateUsers } from '@renderer/actions/actionsLogin';
import UpdateUser from '@renderer/components/modal/UpdateUser';
import UpdateSingleUser from '@renderer/components/modal/UpdateSingleUser';
import UpdatePass from '@renderer/components/modal/UpdatePass';

function Usuario(props) {
  const dataUser = useSelector((state: any) => state.loginAccess.userLogin);
  const dispatch = useDispatch();

  return (
    <div className='App__dashboard__contPageOutlet__user'>
      <div className='App__dashboard__contPageOutlet__user__view'>
        <div className='App__dashboard__contPageOutlet__user__view__userLenght'>
          <h2>{dataUser.nombre_usuario[0].toUpperCase()}</h2>
        </div>
        <h3>{dataUser.type_role}</h3>
        <h2>{dataUser.nombre_usuario}</h2>
      </div>
      <hr />
      <br />
      <div className='App__dashboard__contPageOutlet__user__opcions'>
        <span>Nombre de usuario: <b>{dataUser.nombre_usuario}</b></span>
        <span>Correo: <b>{dataUser.correo}</b></span>
        <span>Id de usuario: <b>{dataUser.id_usuario}</b></span>
        <span>Estado de este usuario: <b>{dataUser.estado}</b></span>
        <span>Rol de este usuario: <b>{dataUser.type_role}</b></span>

        <ButtonStyle disabled={false} nameBtn='Editar información' funtion={() => dispatch(ActiveSubMenuUpdateUsers({
          user: dataUser,
          subMenuUpdateUser: true
        }))} />
        <ButtonStyle disabled={false} nameBtn='Cambiar contraseña' funtion={() => dispatch(ActiveSubMenuUpdatePass({
          user: dataUser,
          subMenuUpdatePass: true
        }))} />
        <ButtonStyle disabled={false} nameBtn='Cerrar sesión' funtion={() =>
          dispatch(ActiveSubMenuDeleteUsers({
            user: {},
            activeDeleteUsers: true,
            typeRemove: 'Logout'
          }))} />
      </div>
      <UpdateSingleUser />
      <UpdatePass/>
    </div>
  );
}

export default Usuario;