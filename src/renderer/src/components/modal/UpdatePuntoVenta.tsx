import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import SwitchButtonEdit from '../SwitchButtonEdit';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ActiveErrorSpam, ActiveSubMenuUpdatePuntoVenta, ActiveSubMenuUpdateRole } from '@renderer/actions/actionsLogin';

function UpdatePuntoVenta(props) {
  const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const { register, handleSubmit, reset } = useForm();
  const [activeEdition, setActiveEdition] = useState<boolean>(true);
  const activeUpdatePuntoVenta = useSelector((state: any) => state.menuAccions.subMenuUpdatePuntoVenta);
  const dispatch = useDispatch();

  const onSubmit = async (dataInput) => {
    try {
      const response = await fetch(`/api/punto-venta/${activeUpdatePuntoVenta.user.id_pv}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: dataInput.nombre,
          direccion: dataInput.direccion,
          numero_serie_dispositivo: dataInput.numero_serie_dispositivo,
          reqUser: userData
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      dispatch(ActiveErrorSpam({ msg: 'Punto de venta actualizado', active: true, typeError: 'submit' }));
      dispatch(ActiveSubMenuUpdateRole({ user: {}, subMenuUpdateRole: false }));
    } catch (error) {
      dispatch(ActiveErrorSpam({ msg: 'Error al actualizar este punto de venta', active: true, typeError: 'Error' }));
      console.log('Ocurrió un error al actualizar este punto de venta');
    }
  }


  useEffect(() => {
    setActiveEdition(true);
  }, [activeUpdatePuntoVenta.subMenuUpdateRole == false])

  return (
    <div className={activeUpdatePuntoVenta.subMenuUpdatePuntoVenta ? 'App__dashboard__contPageOutlet__PageUsers__newUser__active' : 'App__dashboard__contPageOutlet__PageUsers__newUser'}>
      <form className='App__dashboard__contPageOutlet__PageUsers__newUser__form' onSubmit={handleSubmit(onSubmit)}>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__close'>
          <FontAwesomeIcon icon={faXmark} onClick={() => dispatch(ActiveSubMenuUpdatePuntoVenta({ user: {}, subMenuUpdatePuntoVenta: false }))} />
        </div>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs'>
          <h2>Editar este punto de venta</h2>
          <br />
          <br />
          <br />
          <br />
          <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs__check'>
            <label htmlFor="">Editar:</label>
            <SwitchButtonEdit activeEdition={activeEdition} setActiveEdition={() => setActiveEdition(!activeEdition)} />
          </div>
          <label htmlFor='nombre'>Nombre del punto de venta</label>
          <input id='nombre' type="text" {...register('nombre', { required: true, disabled: activeEdition })}
            defaultValue={activeUpdatePuntoVenta.user.nombre} placeholder='Nombre del punto de venta' />
          <label htmlFor='direccion'>Dirección</label>
          <input id='direccion' type="text" {...register('direccion', { required: true, disabled: activeEdition })}
            defaultValue={activeUpdatePuntoVenta.user.direccion} placeholder='Dirección' />
          <label htmlFor='numero_serie_dispositivo'>Numero de serie del dispositivo</label>
          <input id='numero_serie_dispositivo' type="text" {...register('numero_serie_dispositivo', { required: true, disabled: activeEdition })}
            defaultValue={activeUpdatePuntoVenta.user.numero_serie_dispositivo} placeholder='Numero de serie del dispositivo' />
          <button type='submit' disabled={activeEdition}>Editar</button>
          <br />
          <br />
          <br />
          <br />
        </div>
      </form>
    </div>
  );
}

export default UpdatePuntoVenta;