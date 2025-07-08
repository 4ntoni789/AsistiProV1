import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActiveErrorSpam, ActiveSubMenuNewCargo } from '@renderer/actions/actionsLogin';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

function NewCargo(props) {
  const activeNewCargo = useSelector((state: any) => state.menuAccions.subMenuNewCargo);
  const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);

  const onSubmit = async (dataInput) => {
    try {
      const response = await fetch('/api/cargo', {
        method: 'POST',
        headers: {
          'x-id-usuario': userId,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre_cargo: dataInput.nombre_cargo,
          reqUser: userData
        }),
      });

      const result = await response.json();
      if (response.ok) {
        dispatch(ActiveSubMenuNewCargo({ user: {}, subMenuNewCargo: false }));
        dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'submit' }));
        reset();
      } else {
        dispatch(ActiveErrorSpam({ msg: result.error, active: true, typeError: 'Error' }));
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('Ocurrió un error al crear este cargo');
    }
  }

  return (
    <div className={activeNewCargo.subMenuNewCargo ? 'App__dashboard__contPageOutlet__PageUsers__newUser__active' : 'App__dashboard__contPageOutlet__PageUsers__newUser'}>
      <form className='App__dashboard__contPageOutlet__PageUsers__newUser__form' onSubmit={handleSubmit(onSubmit)}>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__close'>
          <FontAwesomeIcon icon={faXmark} onClick={() => dispatch(ActiveSubMenuNewCargo({ user: {}, subMenuNewCargo: false }))} />
        </div>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs'>
          <h2>Nuevo cargo</h2>
          <br />
          <br />
          <br />
          <br />
          <label htmlFor='nombre_cargo'>Nombre del cargo</label>
          <input id='nombre_cargo' type="text" {...register('nombre_cargo', { required: true })} placeholder='Nombre del cargo' />
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

export default NewCargo;