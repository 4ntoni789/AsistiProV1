import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActiveSubMenuNewPuntoVenta, Fetch_new_punto_venta } from '@renderer/actions/actionsPuntoDeVenta';
import { AppDispatch } from '@renderer/store';
import { UserDataType } from '@renderer/typesTS';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

function NewPuntoVenta({ }) {
  const userData = useSelector((state: UserDataType) => state.loginAccess.userLogin);
  const activeNewEmpleado = useSelector((state: any) => state.menuAccions.subMenuNewPuntoVenta);
  // const [userRoles, setUserCargo] = useState<any>();
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);

  const onSubmit = async (dataInput) => {
    dispatch(Fetch_new_punto_venta(dataInput, userId, userData, reset));
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
      </form>
    </div>
  );
}

export default NewPuntoVenta;