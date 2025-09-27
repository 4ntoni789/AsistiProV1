import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import SwitchButtonEdit from '../SwitchButtonEdit';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ActiveSubMenuUpdatePuntoVenta, Fetch_update_punto_venta } from '@renderer/actions/actionsPuntoDeVenta';
import { AppDispatch } from '@renderer/store';
import { UserDataType } from '@renderer/typesTS';

function UpdatePuntoVenta(props) {
  const userData = useSelector((state: UserDataType) => state.loginAccess.userLogin);
  const { register, handleSubmit, reset } = useForm();
  const [activeEdition, setActiveEdition] = useState<boolean>(true);
  const activeUpdatePuntoVenta = useSelector((state: any) => state.menuAccions.subMenuUpdatePuntoVenta);
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);

  const onSubmit = async (dataInput) => {
    dispatch(Fetch_update_punto_venta(dataInput, activeUpdatePuntoVenta, userId, userData));
  }

  useEffect(() => {
    setActiveEdition(true);
  }, [activeUpdatePuntoVenta.subMenuUpdateRole == false])

  return (
    <div className={activeUpdatePuntoVenta.subMenuUpdatePuntoVenta ? 'App__dashboard__contPageOutlet__PageUsers__newUser__active' : 'App__dashboard__contPageOutlet__PageUsers__newUser'}>
      <form className='App__dashboard__contPageOutlet__PageUsers__newUser__form' onSubmit={handleSubmit(onSubmit)}>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__close'>
          <FontAwesomeIcon icon={faXmark} onClick={() => dispatch(ActiveSubMenuUpdatePuntoVenta({ user: {}, subMenuUpdatePuntoVenta: false }))}
            tabIndex={activeUpdatePuntoVenta.subMenuUpdatePuntoVenta ? 10 : -1} />
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
            defaultValue={activeUpdatePuntoVenta.user.nombre} placeholder='Nombre del punto de venta'
            tabIndex={activeUpdatePuntoVenta.subMenuUpdatePuntoVenta && activeEdition ? 11 : -1} />
          <label htmlFor='direccion'>Dirección</label>
          <input id='direccion' type="text" {...register('direccion', { required: true, disabled: activeEdition })}
            defaultValue={activeUpdatePuntoVenta.user.direccion} placeholder='Dirección'
            tabIndex={activeUpdatePuntoVenta.subMenuUpdatePuntoVenta && activeEdition ? 12 : -1} />
          <label htmlFor='numero_serie_dispositivo'>Numero de serie del dispositivo</label>
          <input id='numero_serie_dispositivo' type="text" {...register('numero_serie_dispositivo', { required: true, disabled: activeEdition })}
            defaultValue={activeUpdatePuntoVenta.user.numero_serie_dispositivo} placeholder='Numero de serie del dispositivo'
            tabIndex={activeUpdatePuntoVenta.subMenuUpdatePuntoVenta && activeEdition ? 13 : -1} />
          <button type='submit' disabled={activeEdition}
            tabIndex={activeUpdatePuntoVenta.subMenuUpdatePuntoVenta && activeEdition ? 14 : -1}>Editar</button>
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