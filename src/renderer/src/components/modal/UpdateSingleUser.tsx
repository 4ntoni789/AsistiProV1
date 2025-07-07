import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActiveErrorSpam, ActiveSubMenuUpdateUsers } from '@renderer/actions/actionsLogin';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import SwitchButtonEdit from '../SwitchButtonEdit';

function UpdateSingleUser(props) {
  const [activeEdition, setActiveEdition] = useState<boolean>(true);
  const { register, handleSubmit, reset } = useForm();
  const activeUpdateUser = useSelector((state: any) => state.menuAccions.subMenuUpdateUser);
  const userId = useSelector((state: any) => state.loginAccess.userLogin?.id_usuario);
  const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const [userRoles, setUserRoles] = useState<any>();
  const dispatch = useDispatch();

  const onSubmit = async (dataInput) => {
    try {
      const response = await fetch(`/api/single-usuario/${activeUpdateUser.user.id_usuario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-id-usuario': userId
        },
        body: JSON.stringify({
          nombre_usuario: dataInput.nombre_usuario,
          email: dataInput.email,
          reqUser: userData
        }),
      });

      const result = await response.json();
      if (response.ok) {
        dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'submit' }));
        dispatch(ActiveSubMenuUpdateUsers({ user: {}, subMenuUpdateUser: false }));
      } else {
        throw new Error(result.error);
      }
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