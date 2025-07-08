import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActiveErrorSpam, ActiveSubMenuNewEmpleador } from '@renderer/actions/actionsLogin';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

function NewEmpleador(props) {
  const activeNewRole = useSelector((state: any) => state.menuAccions.subMenuNewEmpleador);
  const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);

  const onSubmit = async (dataInput) => {
    try {
      const response = await fetch('/api/empleador', {
        method: 'POST',
        headers: {
          'x-id-usuario': userId,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre_empleador: dataInput.nombre_empleador,
          nit: dataInput.nit_empleador,
          direccion_empleador: dataInput.direccion_empleador,
          reqUser: userData
        }),
      });

      const result = await response.json();
      if (response.ok) {
        dispatch(ActiveSubMenuNewEmpleador({ user: {}, subMenuNewEmpleador: false }));
        dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'submit' }));
        reset();
      } else {
        dispatch(ActiveErrorSpam({ msg: result.error, active: true, typeError: 'error' }));
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('Ocurrió un error al crear este empleador');
    }
  }
  return (
    <div className={activeNewRole.subMenuNewEmpleador ? 'App__dashboard__contPageOutlet__PageUsers__newUser__active' : 'App__dashboard__contPageOutlet__PageUsers__newUser'}>
      <form className='App__dashboard__contPageOutlet__PageUsers__newUser__form' onSubmit={handleSubmit(onSubmit)}>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__close'>
          <FontAwesomeIcon icon={faXmark} onClick={() => dispatch(ActiveSubMenuNewEmpleador({ user: {}, subMenuNewEmpleador: false }))} />
        </div>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs'>
          <h2>Nuevo empleador</h2>
          <br />
          <br />
          <br />
          <br />
          <label htmlFor='nombre_empleador'>Nombre del empleador</label>
          <input id='nombre_empleador' type="text" {...register('nombre_empleador', { required: true })} placeholder='Nombre del empleador' />

          <label htmlFor='nit_empleador'>Nit</label>
          <input id='nit_empleador' type="number" {...register('nit_empleador', { required: true })} placeholder='Nit' />

          <label htmlFor='direccion_empleador'>Dirección del empleador</label>
          <input id='direccion_empleador' type="text" {...register('direccion_empleador', { required: true })} placeholder='Dirección' />
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

export default NewEmpleador;