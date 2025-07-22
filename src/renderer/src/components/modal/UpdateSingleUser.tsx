import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import SwitchButtonEdit from '../SwitchButtonEdit';
import { ActiveSubMenuUpdateUsers } from '@renderer/actions/actionsUsers';
import { Fetch_roles } from '@renderer/actions/actionsRoles';
import { obtenerDatos } from '@renderer/scripts/obtenerDatosFetch';
import { AppDispatch } from '@renderer/store';
import { Fetch_update_single_user } from '@renderer/actions/actionsUser';

function UpdateSingleUser({ }) {
  const [activeEdition, setActiveEdition] = useState<boolean>(true);
  const { register, handleSubmit, reset } = useForm();
  const activeUpdateUser = useSelector((state: any) => state.menuAccions.subMenuUpdateUser);
  const userId = useSelector((state: any) => state.loginAccess.userLogin?.id_usuario);
  const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const [userRoles, setUserRoles] = useState<any>();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (dataInput) => {
    dispatch(Fetch_update_single_user(dataInput, activeUpdateUser, userId, userData));
  }

  useEffect(() => {
    setActiveEdition(true);
    obtenerDatos(null, dispatch(Fetch_roles(userId)), setUserRoles);
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
          <br />
          <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs__check'>
            <label htmlFor="">Editar:</label>
            <SwitchButtonEdit activeEdition={activeEdition} setActiveEdition={() => setActiveEdition(!activeEdition)} />
          </div>
          <label htmlFor='nombre_usuario'>Nombre completo</label>
          <input id='nombre_usuario' type="text" {...register('nombre_usuario', { required: true, disabled: activeEdition })} defaultValue={activeUpdateUser.user.nombre_usuario} />
          <label htmlFor='email'>Correo electronico</label>
          <input id='email' type="text" {...register('email', { required: true, disabled: activeEdition })} defaultValue={activeUpdateUser.user.correo} />
          <button disabled={activeEdition} type='submit'>Actualizar</button>
          <br />
          <br />
        </div>
      </form>
    </div>
  );
}

export default UpdateSingleUser;