import { useState } from 'react';
import '../css/switchButton.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@renderer/store';
import { Fetch_activate_user } from '@renderer/actions/actionsUsers';
import { UserDataType } from '@renderer/typesTS';

function SwitchButton({ estado, disabled }) {
  const dispatch = useDispatch<AppDispatch>();
  const [btnActive, setBtnActive] = useState<boolean>(estado.estado == 'activo' ? true : false);
  const userData = useSelector((state: UserDataType) => state.loginAccess.userLogin);
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);

  const handlerToggle = async () => {
    dispatch(Fetch_activate_user(userId, estado, userData, btnActive))
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
          <div className={btnActive ? 'toggle__active' : 'toggle'} title={btnActive ? 'Desactivar' : 'Activar'}>
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