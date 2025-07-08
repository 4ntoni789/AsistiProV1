import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataUser from '../DataUser';
import FormEmpleadoContrato from '../FormEmpleadoContrato';
import { ActiveSubMenuPuntoVenta } from '@renderer/actions/actionsLogin';
import FormNewHorario from '../FormNewHorario';

function NewHorario(props) {
  const activeMenuPuntoVenta = useSelector((state: any) => state.menuAccions.subMenuPuntoVenta);
  const [userCargo, setUserCargo] = useState<[]>([]);
  const dispatch = useDispatch();
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);

  useEffect(() => {
    fetch('/api/cargos', {
      headers: {
        'x-id-usuario': userId
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setUserCargo(data)
      })
      .catch((err) => console.error('Error:', err));
  }, [activeMenuPuntoVenta.subMenuPuntoVenta == true]);

  return (
    <>
      <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form'>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__close'>
          <FontAwesomeIcon icon={faXmark} onClick={() => dispatch((ActiveSubMenuPuntoVenta({ user: {}, subMenuPuntoVenta: false })))} />
        </div>
        <FormNewHorario userCargo={userCargo} />
      </div>
    </>
  );
}

export default NewHorario;