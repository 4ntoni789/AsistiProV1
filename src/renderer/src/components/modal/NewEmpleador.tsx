import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActiveSubMenuNewEmpleador, Fetch_new_empleador } from '@renderer/actions/actionsEmpleadores';
import { AppDispatch } from '@renderer/store';
import { UserDataType } from '@renderer/typesTS';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

function NewEmpleador({}) {
  const activeNewRole = useSelector((state: any) => state.menuAccions.subMenuNewEmpleador);
  const userData = useSelector((state: UserDataType) => state.loginAccess.userLogin);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);

  const onSubmit = async (dataInput) => {
    dispatch(Fetch_new_empleador(dataInput, userId, userData, reset));
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