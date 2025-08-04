import { useDispatch, useSelector } from 'react-redux';
import '../css/user.css';
import ButtonStyle from '@renderer/components/ButtonStyle';
import UpdateSingleUser from '@renderer/components/modal/UpdateSingleUser';
import UpdatePass from '@renderer/components/modal/UpdatePass';
import BtnDarkMode from '@renderer/components/BtnDarkMode';
import { ActiveSubMenuDeleteUsers, ActiveSubMenuUpdateUsers } from '@renderer/actions/actionsUsers';
import { ActiveSubMenuUpdatePass } from '@renderer/actions/actionsUser';

function Usuario({ }) {
  const dataUser = useSelector((state: any) => state.loginAccess.userLogin);
  const dispatch = useDispatch();

  return (
    <div className='App__dashboard__contPageOutlet__user'>
      <BtnDarkMode />
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

        <button className='btn_style' onClick={() => dispatch(ActiveSubMenuUpdateUsers({
          user: dataUser,
          subMenuUpdateUser: true
        }))} >Editar información</button>

        <button className='btn_style' onClick={() => dispatch(ActiveSubMenuUpdatePass({
          user: dataUser,
          subMenuUpdatePass: true
        }))}>
          Cambiar contraseña
        </button>

        <button className='btn_style' onClick={() =>
          dispatch(ActiveSubMenuDeleteUsers({
            user: {},
            activeDeleteUsers: true,
            typeRemove: 'Logout'
          }))}>Cerrar sesión</button>
      </div>
      <UpdateSingleUser />
      <UpdatePass />
    </div>
  );
}

export default Usuario;