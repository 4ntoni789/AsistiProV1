import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActiveErrorSpam, ActiveSubMenuUpdateUsers } from '@renderer/actions/actionsLogin';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import '../../css/newUsers.css';
import SwitchButtonEdit from '../SwitchButtonEdit';

function UpdateUser(props) {
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);
  const [activeEdition, setActiveEdition] = useState<boolean>(true);
  const { register, handleSubmit, reset } = useForm();
  const activeUpdateUser = useSelector((state: any) => state.menuAccions.subMenuUpdateUser);
  const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const [userRoles, setUserRoles] = useState<any>();
  const dispatch = useDispatch();

  const onSubmit = async (dataInput) => {
    try {
      const response = await fetch(`/api/usuarios/${activeUpdateUser.user.id_usuario}`, {
        method: 'PUT',
        headers: {
          'x-id-usuario': userId,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre_usuario: dataInput.nombre_usuario,
          id_rol: dataInput.id_rol,
          email: dataInput.email,
          reqUser: userData
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      dispatch(ActiveErrorSpam({ msg: 'Usuario actualizado', active: true, typeError: 'submit' }));
      dispatch(ActiveSubMenuUpdateUsers({ user: {}, subMenuUpdateUser: false }));
    } catch (error) {
      dispatch(ActiveErrorSpam({ msg: 'Error al actualizar el usuario', active: true, typeError: 'Error' }));
      console.log('Ocurrió un error al actualizar el usuario');
    }
  }
  useEffect(() => {
    setActiveEdition(true);
    fetch('/api/roles', {
      headers: {
        'x-id-usuario': userId
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setUserRoles(data);
      })
      .catch((err) => console.error('Error:', err));
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