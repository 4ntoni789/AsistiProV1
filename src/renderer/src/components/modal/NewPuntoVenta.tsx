import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActiveErrorSpam, ActiveSubMenuNewPuntoVenta } from '@renderer/actions/actionsLogin';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

function NewPuntoVenta(props) {
  const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const activeNewEmpleado = useSelector((state: any) => state.menuAccions.subMenuNewPuntoVenta);
  // const [userRoles, setUserCargo] = useState<any>();
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (dataInput) => {
    try {
      const response = await fetch('/api/punto-venta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: dataInput.nombre,
          direccion:dataInput.direccion,
          numero_serie_dispositivo: dataInput.numero_serie_dispositivo,
          reqUser: userData
        }),
      });

      const result = await response.json();
      if (response.ok) {
        dispatch(ActiveSubMenuNewPuntoVenta({ user: {}, subMenuNewPuntoVenta: false }));
        dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'submit' }));
        reset();
      }else{
        dispatch(ActiveErrorSpam({ msg: result.error, active: true, typeError: 'Error' }));
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('Ocurrió un error al crear el empleado');
    }
  }

  return (
    <div className={activeNewEmpleado.subMenuNewPuntoVenta ? 'App__dashboard__contPageOutlet__PageUsers__newUser__active' : 'App__dashboard__contPageOutlet__PageUsers__newUser'}>
      <form className='App__dashboard__contPageOutlet__PageUsers__newUser__form' onSubmit={handleSubmit(onSubmit)}>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__close'>
          <FontAwesomeIcon icon={faXmark} onClick={() => {
            dispatch(ActiveSubMenuNewPuntoVenta({ user: {}, subMenuNewPuntoVenta: false }));
            reset();
          }} />
        </div>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs'>
          <h2>Nuevo Punto de venta</h2>
          <br />
          <br />
          <label htmlFor='nombre'>Nombre del punto de venta</label>
          <input id='nombre' type="text" {...register('nombre', { required: true })} placeholder='Nombre del punto de venta' />
          <label htmlFor='direccion'>Dirección</label>
          <input id='direccion' type="text" {...register('direccion', { required: true })} placeholder='Dirección' />
          <label htmlFor='numero_serie_dispositivo'>Numero de serie del dispositivo</label>
          <input id='numero_serie_dispositivo' type="text" {...register('numero_serie_dispositivo', { required: true })} placeholder='Numero de serie' />
          <button type='submit'>Registrar</button>
          <br />
          <br />
          <br />
        </div>
        {/* <label>
                    <input type="checkbox" onClick={(e: any) => e.target.checked ? setUserActiveCheck('activo') : setUserActiveCheck('inactivo')} {...register('estado')} />
                    Activo
                </label> */}
      </form>
    </div>
  );
}

export default NewPuntoVenta;