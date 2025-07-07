import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActiveErrorSpam, ActiveSubMenuNewRole } from '@renderer/actions/actionsLogin';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

function NewRole(props) {
  const activeNewRole = useSelector((state: any) => state.menuAccions.subMenuNewRole);
  const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (dataInput) => {
    try {
      const response = await fetch('/api/rol', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_rol: dataInput.nombre_rol,
          reqUser: userData
        }),
      });

      const result = await response.json();
      if (response.ok) {
        dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'submit' }));
        reset();
        dispatch(ActiveSubMenuNewRole({ user: {}, subMenuNewRole: false }));
      } else {
        dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'submit' }));
        throw new Error(result.error);
      }
    } catch (error) {
      dispatch(ActiveErrorSpam({ msg: 'Error al crear este rol', active: true, typeError: 'Error' }));
      console.error('Error:', error);
    }
  }
  return (
    <div className={activeNewRole.subMenuNewRole ? 'App__dashboard__contPageOutlet__PageUsers__newUser__active' : 'App__dashboard__contPageOutlet__PageUsers__newUser'}>
      <form className='App__dashboard__contPageOutlet__PageUsers__newUser__form' onSubmit={handleSubmit(onSubmit)}>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__close'>
          <FontAwesomeIcon icon={faXmark} onClick={() => dispatch(ActiveSubMenuNewRole({ user: {}, subMenuNewRole: false }))} />
        </div>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs'>
          <h2>Nuevo rol</h2>
          <br />
          <br />
          <br />
          <br />
          <label htmlFor='nombre_rol'>Nombre del rol</label>
          <input id='nombre_rol' type="text" {...register('nombre_rol', { required: true })} placeholder='Nombre del rol' />
          <button type='submit'>Registrar</button>
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </form>
    </div>
  );
}

export default NewRole;