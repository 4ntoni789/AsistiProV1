import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import SwitchButtonEdit from '../SwitchButtonEdit';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ActiveSubMenuUpdateRole, Fetch_update_role } from '@renderer/actions/actionsRoles';
import { UserDataType } from '@renderer/typesTS';
import { AppDispatch } from '@renderer/store';

function UpdateRole(props) {
  const userData = useSelector((state: UserDataType) => state.loginAccess.userLogin);
  const { register, handleSubmit, reset } = useForm();
  const [activeEdition, setActiveEdition] = useState<boolean>(true);
  const activeUpdateRole = useSelector((state: any) => state.menuAccions.subMenuUpdateRole);
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);

  const onSubmit = async (dataInput) => {
    dispatch(Fetch_update_role(dataInput, userId, activeUpdateRole, userData));
  }


  useEffect(() => {
    setActiveEdition(true);
  }, [activeUpdateRole.subMenuUpdateRole == false])

  return (
    <div className={activeUpdateRole.subMenuUpdateRole ? 'App__dashboard__contPageOutlet__PageUsers__newUser__active' : 'App__dashboard__contPageOutlet__PageUsers__newUser'}>
      <form className='App__dashboard__contPageOutlet__PageUsers__newUser__form' onSubmit={handleSubmit(onSubmit)}>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__close'>
          <FontAwesomeIcon icon={faXmark} onClick={() => dispatch(ActiveSubMenuUpdateRole({ user: {}, subMenuUpdateRole: false }))} />
        </div>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs'>
          <h2>Editar rol</h2>
          <br />
          <br />
          <br />
          <br />
          <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs__check'>
            <label htmlFor="">Editar:</label>
            <SwitchButtonEdit activeEdition={activeEdition} setActiveEdition={() => setActiveEdition(!activeEdition)} />
          </div>
          <label htmlFor='nombre_rol'>Nombre del rol</label>
          <input id='nombre_rol' type="text" {...register('nombre_rol', { required: true, disabled: activeEdition })}
            defaultValue={activeUpdateRole.user.item?.nombre_rol} placeholder='Nombre del rol' />
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

export default UpdateRole;