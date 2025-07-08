import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActiveErrorSpam, ActiveSubMenuUpdateCargo } from '@renderer/actions/actionsLogin';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import SwitchButtonEdit from '../SwitchButtonEdit';

function UpdateCargo(props) {
  const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const { register, handleSubmit, reset } = useForm();
  const [activeEdition, setActiveEdition] = useState<boolean>(true);
  const activeUpdateCargo = useSelector((state: any) => state.menuAccions.subMenuUpdateCargo);
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);
  const dispatch = useDispatch();

  const onSubmit = async (dataInput) => {
    try {
      const response = await fetch(`/api/cargo/${activeUpdateCargo.user.item.id_cargo}`, {
        method: 'PUT',
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
      if (!response.ok) throw new Error(result.error);
      dispatch(ActiveErrorSpam({ msg: 'Cargo actualizado', active: true, typeError: 'submit' }));
      dispatch(ActiveSubMenuUpdateCargo({ user: {}, subMenuUpdateCargo: false }));
    } catch (error) {
      dispatch(ActiveErrorSpam({ msg: 'Error al actualizar este cargo', active: true, typeError: 'Error' }));
      console.log('Ocurrió un error al actualizar este cargo');
    }
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