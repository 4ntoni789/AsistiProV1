import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActiveErrorSpam, } from '@renderer/actions/actionsLogin';
import { ActiveSubMenuNewRole, Fetch_new_role } from '@renderer/actions/actionsRoles';
import { AppDispatch } from '@renderer/store';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

function NewRole(props) {
  const activeNewRole = useSelector((state: any) => state.menuAccions.subMenuNewRole);
  const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);

  const onSubmit = async (dataInput) => {
    dispatch(Fetch_new_role(dataInput, userId, userData, reset));
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