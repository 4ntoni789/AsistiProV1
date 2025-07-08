import { faEye, faEyeLowVision, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActiveErrorSpam, ActiveSubMenuUpdatePass, ActiveSubMenuUpdateUsers } from '@renderer/actions/actionsLogin';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import SwitchButtonEdit from '../SwitchButtonEdit';

function UpdatePass(props) {
  const [activeEdition, setActiveEdition] = useState<boolean>(true);
  const { register, handleSubmit, reset } = useForm();
  const activeUpdateUser = useSelector((state: any) => state.menuAccions.subMenuUpdatePass);
  const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState<boolean>(true);
  const [typeErrorPass, setTypeErrorPass] = useState<{ activeError: boolean, typeError: string }>({
    activeError: false,
    typeError: ''
  });
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);

  const onSubmit = async (dataInput) => {
    const response = await fetch(`/api/single-usuario-put-pass/${activeUpdateUser.user.id_usuario}`, {
      method: 'PUT',
      headers: {
        'x-id-usuario': userId,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: dataInput.contrasena,
        reqUser: userData
      }),
    });

    const result = await response.json();
    if (response.ok) {
      dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'submit' }));
      dispatch(ActiveSubMenuUpdatePass({ user: {}, subMenuUpdatePass: false }));
      reset()
      setTypeErrorPass({
        activeError: false,
        typeError: ''
      });
    } else {
      setTypeErrorPass({
        activeError: true,
        typeError: result.message
      });

    }
  }

  useEffect(() => {
    setActiveEdition(true);
    setShowPass(false);
  }, [activeUpdateUser.subMenuUpdatePass == true]);

  return (
    <div className={activeUpdateUser.subMenuUpdatePass ? 'App__dashboard__contPageOutlet__PageUsers__newUser__active' : 'App__dashboard__contPageOutlet__PageUsers__newUser'}>
      <form className='App__dashboard__contPageOutlet__PageUsers__newUser__form' onSubmit={handleSubmit(onSubmit)}>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__close'>
          <FontAwesomeIcon icon={faXmark} onClick={() => dispatch(ActiveSubMenuUpdatePass({
            user: {},
            subMenuUpdatePass: false
          }))} />
        </div>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs'>
          <h2>Cambiar mi contraseña</h2>
          <br />
          <br />
          <br />
          <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs__check'>
            <label htmlFor="">Activar edicion:</label>
            <SwitchButtonEdit activeEdition={activeEdition} setActiveEdition={() => setActiveEdition(!activeEdition)} />
          </div>
          <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs__contForm'>
            <label htmlFor='contrasena'>Contraseña</label>
            <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs__contForm__showPass'>
              <input id='contrasena' type={showPass ? "password" : "text"} {...register('contrasena', { required: true, disabled: activeEdition })} placeholder='Nueva contraseña' />
              <FontAwesomeIcon icon={showPass ? faEye : faEyeLowVision} onClick={() => setShowPass(!showPass)} />
            </div>
            <div className={typeErrorPass.activeError ? 'App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs__contForm__passInvalid__active'
              : 'App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs__contForm__passInvalid'}>
              <span>{typeErrorPass.typeError}</span>
            </div>
          </div>
          <button disabled={activeEdition} type='submit'>Cambiar</button>
          <br />
          <br />
          <br />
        </div>
      </form>
    </div>
  );
}

export default UpdatePass;