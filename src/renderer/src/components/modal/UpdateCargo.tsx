import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import SwitchButtonEdit from '../SwitchButtonEdit';
import { ActiveSubMenuUpdateCargo, Fetch_update_cargo } from '@renderer/actions/actionsCargos';
import { AppDispatch } from '@renderer/store';
import { UserDataType } from '@renderer/typesTS';

function UpdateCargo({}) {
  const userData = useSelector((state: UserDataType) => state.loginAccess.userLogin);
  const { register, handleSubmit, reset } = useForm();
  const [activeEdition, setActiveEdition] = useState<boolean>(true);
  const activeUpdateCargo = useSelector((state: any) => state.menuAccions.subMenuUpdateCargo);
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (dataInput) => {
    dispatch(Fetch_update_cargo(dataInput, activeUpdateCargo, userId, userData));
  }

  useEffect(() => {
    setActiveEdition(true);
  }, [activeUpdateCargo.subMenuUpdateCargo == false])

  return (
    <div className={activeUpdateCargo.subMenuUpdateCargo ? 'App__dashboard__contPageOutlet__PageUsers__newUser__active' : 'App__dashboard__contPageOutlet__PageUsers__newUser'}>
      <form className='App__dashboard__contPageOutlet__PageUsers__newUser__form' onSubmit={handleSubmit(onSubmit)}>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__close'>
          <FontAwesomeIcon icon={faXmark} onClick={() => dispatch(ActiveSubMenuUpdateCargo({ user: {}, subMenuUpdateCargo: false }))} />
        </div>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs'>
          <h2>Editar cargo</h2>
          <br />
          <br />
          <br />
          <br />
          <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs__check'>
            <label htmlFor="">Editar:</label>
            <SwitchButtonEdit activeEdition={activeEdition} setActiveEdition={() => setActiveEdition(!activeEdition)} />
          </div>
          <label htmlFor='nombre_cargo'>Nombre del cargo</label>
          <input id='nombre_cargo' type="text" {...register('nombre_cargo', { required: true, disabled: activeEdition })} defaultValue={activeUpdateCargo.user.item?.nombre_cargo} placeholder='Nombre del cargo' />
          <button type='submit' disabled={activeEdition}>Registrar</button>
          <br />
          <br />
          <br />
          <br />
        </div>
      </form>
    </div>
  );
}

export default UpdateCargo;