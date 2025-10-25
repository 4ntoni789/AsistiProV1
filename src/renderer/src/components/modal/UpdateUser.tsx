import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActiveErrorSpam } from '@renderer/actions/actionsLogin';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import '../../css/newUsers.css';
import SwitchButtonEdit from '../SwitchButtonEdit';
import { ActiveSubMenuUpdateUsers, Fetch_update_user } from '@renderer/actions/actionsUsers';
import { obtenerDatos } from '@renderer/scripts/obtenerDatosFetch';
import { Fetch_roles } from '@renderer/actions/actionsRoles';
import { AppDispatch } from '@renderer/store';
import { UserDataType } from '@renderer/typesTS';

function UpdateUser(props) {
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);
  const [activeEdition, setActiveEdition] = useState<boolean>(true);
  const { register, handleSubmit } = useForm();
  const activeUpdateUser = useSelector((state: any) => state.menuAccions.subMenuUpdateUser);
  const userData = useSelector((state: UserDataType) => state.loginAccess.userLogin);
  const [userRoles, setUserRoles] = useState<any>();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (dataInput) => {
    dispatch(Fetch_update_user(dataInput, userData, activeUpdateUser, userId));
  }
  useEffect(() => {
    obtenerDatos(dispatch(Fetch_roles(userId)), setUserRoles);
  }, [activeUpdateUser.subMenuUpdateUser == true]);

  return (
    <div className={activeUpdateUser.subMenuUpdateUser ? 'App__dashboard__contPageOutlet__PageUsers__newUser__active' : 'App__dashboard__contPageOutlet__PageUsers__newUser'}>
      <form className='App__dashboard__contPageOutlet__PageUsers__newUser__form' onSubmit={handleSubmit(onSubmit)}>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__close'>
          <FontAwesomeIcon icon={faXmark} onClick={() => dispatch(ActiveSubMenuUpdateUsers({
            user: {},
            subMenuUpdateUser: false
          }))} />
        </div>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs'>
          <h2>Editar usuario</h2>
          <br />
          <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs__check'>
            <label htmlFor="">Editar:</label>
            <SwitchButtonEdit activeEdition={activeEdition} setActiveEdition={() => setActiveEdition(!activeEdition)} />
          </div>
          <label htmlFor='nombre_usuario'>Nombre completo</label>
          <input id='nombre_usuario' type="text" {...register('nombre_usuario', { required: true, disabled: activeEdition })} defaultValue={activeUpdateUser.user.nombre_usuario} />
          <label htmlFor='email'>Correo electronico</label>
          <input id='email' type="text" {...register('email', { required: true, disabled: activeEdition })} defaultValue={activeUpdateUser.user.correo} />
          <label htmlFor='id_rol'>Rol</label>
          <select id='id_rol' {...register('id_rol', { required: true, disabled: activeEdition })}>
            <option value={activeUpdateUser?.user.id_rol}>{activeUpdateUser?.user.type_role}</option>
            {
              userRoles?.map((item, i) => (
                activeUpdateUser?.user.id_rol != item.id_rol ? <option key={i} value={item.id_rol}>{item.nombre_rol}</option> : null
              ))
            }
          </select>
          <button disabled={activeEdition} type='submit'>Actualizar</button>
          <br />
        </div>
      </form>
    </div>
  );
}

export default UpdateUser;