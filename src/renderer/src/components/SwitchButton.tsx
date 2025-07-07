import React, { useEffect, useState } from 'react';
import '../css/switchButton.css';
import { useDispatch, useSelector } from 'react-redux';
import { ActiveErrorSpam } from '@renderer/actions/actionsLogin';

function SwitchButton({ estado, disabled }) {
  const dispatch = useDispatch();
  const [btnActive, setBtnActive] = useState<boolean>(estado.estado == 'activo' ? true : false);
  const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const handlerToggle = async () => {
    try {
      const response = await fetch(`/api/usuarios-active/${estado.id_usuario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          estado: btnActive == true ? 'inactivo' : 'activo',
          reqUser: userData
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      if (!btnActive) {
        dispatch(ActiveErrorSpam({ msg: `Usuario ${!btnActive ? 'activo' : 'inactivo'}`, active: true, typeError: 'submit' }))
        
      } else {
        dispatch(ActiveErrorSpam({ msg: `Usuario ${!btnActive ? 'activo' : 'inactivo'}`, active: true, typeError: 'error' }))
      }
      
    } catch (error) {
      dispatch(ActiveErrorSpam({ msg: `Ocurrió un error al activar el usuario`, active: true, typeError: 'error' }))
    }
  }

  return (
    <>
      {
        disabled ? <div className='disable'>
          <label className={btnActive ? 'toggle__label__active' : 'toggle__label'}>
            <input type='checkbox' onClick={() => {
              // setBtnActive(!btnActive);
              // handlerToggle()
            }} className='toggle__input' />
          </label>
        </div>
          :
          <div className={btnActive ? 'toggle__active' : 'toggle'}>
            <label className={btnActive ? 'toggle__label__active' : 'toggle__label'}>
              <input type='checkbox' onClick={() => {
                setBtnActive(!btnActive);
                handlerToggle();
              }} className='toggle__input' />
            </label>
          </div>
      }
    </>
  );
}

export default SwitchButton;