import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActiveErrorSpam, ActiveSubMenuUpdateEmpleador } from '@renderer/actions/actionsLogin';
import React, { useEffect, useState } from 'react';
import SwitchButtonEdit from '../SwitchButtonEdit';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

function UpdateEmpleador(props) {
  const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const { register, handleSubmit, reset } = useForm();
  const [activeEdition, setActiveEdition] = useState<boolean>(true);
  const activeUpdateEmpleador = useSelector((state: any) => state.menuAccions.subMenuUpdateEmpleador);
  const dispatch = useDispatch();

  const onSubmit = async (dataInput) => {
    try {
      const response = await fetch(`/api/empleador/${activeUpdateEmpleador.user.item.id_empleador}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_empleador: dataInput.nombre_empleador,
          nit: dataInput.nit,
          direccion_empleador: dataInput.direccion,
          reqUser: userData
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      dispatch(ActiveErrorSpam({ msg: 'Empleador actualizado', active: true, typeError: 'submit' }));
      dispatch(ActiveSubMenuUpdateEmpleador({ user: {}, subMenuUpdateCargo: false }));
    } catch (error) {
      dispatch(ActiveErrorSpam({ msg: 'Error al actualizar este Empleador', active: true, typeError: 'Error' }));
      console.log('Ocurrió un error al actualizar este Empleador');
    }
  }


  useEffect(() => {
    setActiveEdition(true);
  }, [activeUpdateEmpleador.subMenuUpdateEmpleador == false])

  return (
    <div className={activeUpdateEmpleador.subMenuUpdateEmpleador ? 'App__dashboard__contPageOutlet__PageUsers__newUser__active' : 'App__dashboard__contPageOutlet__PageUsers__newUser'}>
      <form className='App__dashboard__contPageOutlet__PageUsers__newUser__form' onSubmit={handleSubmit(onSubmit)}>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__close'>
          <FontAwesomeIcon icon={faXmark} onClick={() => dispatch(ActiveSubMenuUpdateEmpleador({ user: {}, subMenuUpdateEmpleador: false }))} />
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
          <label htmlFor='nombre_empleador'>Nombre del empleador</label>
          <input id='nombre_empleador' type="text" {...register('nombre_empleador', { required: true, disabled: activeEdition })}
            defaultValue={activeUpdateEmpleador.user.item?.nombre_empleador}
            placeholder='Nombre del empleador' />
          <label htmlFor='nit'>Nit</label>
          <input id='nit' type="number" {...register('nit', { required: true, disabled: activeEdition })}
            defaultValue={activeUpdateEmpleador.user.item?.nit}
            placeholder='Nit' />
          <label htmlFor='direccion'>Dirección del empleador</label>
          <input id='direccion' type="text" {...register('direccion', { required: true, disabled: activeEdition })}
            defaultValue={activeUpdateEmpleador.user.item?.direccion_empleador}
            placeholder='Dirección del empleador' />
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

export default UpdateEmpleador;