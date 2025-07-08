import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import SwitchButtonEdit from '../SwitchButtonEdit';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ActiveErrorSpam, ActiveSubMenuUpdateRole } from '@renderer/actions/actionsLogin';

function UpdateRole(props) {
  const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const { register, handleSubmit, reset } = useForm();
  const [activeEdition, setActiveEdition] = useState<boolean>(true);
  const activeUpdateRole = useSelector((state: any) => state.menuAccions.subMenuUpdateRole);
  const dispatch = useDispatch();
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);

  const onSubmit = async (dataInput) => {
    try {
      const response = await fetch(`/api/rol/${activeUpdateRole.user.item.id_rol}`, {
        method: 'PUT',
        headers: {
          'x-id-usuario': userId,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre_rol: dataInput.nombre_rol,
          reqUser: userData
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      dispatch(ActiveErrorSpam({ msg: 'rol actualizado', active: true, typeError: 'submit' }));
      dispatch(ActiveSubMenuUpdateRole({ user: {}, subMenuUpdateRole: false }));
    } catch (error) {
      dispatch(ActiveErrorSpam({ msg: 'Error al actualizar este rol', active: true, typeError: 'Error' }));
      console.log('Ocurrió un error al actualizar este rol');
    }
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