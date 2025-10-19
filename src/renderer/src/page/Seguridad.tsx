import { useState } from 'react'
import '../css/seguridad.css'
import SwitchButtonEdit from '@renderer/components/SwitchButtonEdit'
import { obtenerDatos } from '@renderer/scripts/obtenerDatosFetch';
import { Fetch_update_pass, Fetch_update_single_user } from '@renderer/actions/actionsUser';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { AppDispatch } from '@renderer/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeLowVision } from '@fortawesome/free-solid-svg-icons';
import { ActiveErrorSpam } from '@renderer/actions/actionsLogin';

function Seguridad() {
  const [activeEdition, setActiveEdition] = useState<boolean>(true);
  const [activeEditionPass, setActiveEditionPass] = useState<boolean>(true);
  const { register, handleSubmit, reset } = useForm();
  const activeUpdateUser = useSelector((state: any) => state.menuAccions.subMenuUpdateUser);
  const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const dispatch = useDispatch<AppDispatch>();
  const [showPass, setShowPass] = useState<boolean>(true);

  const [typeErrorPass, setTypeErrorPass] = useState<{ activeError: boolean, typeError: string }>({
    activeError: false,
    typeError: ''
  });

  const onSubmit = async (dataInput) => {
    if (!activeEdition || !activeEditionPass) {
      if (!activeEdition && dataInput.nombre_usuario !== userData.nombre_usuario && dataInput.email !== userData.correo) {
        dispatch(Fetch_update_single_user(dataInput, activeUpdateUser, userData.userId, userData));
      } else if (dataInput.contrasena === dataInput.cncontrasena) {
        obtenerDatos(dispatch(Fetch_update_pass(dataInput, userData, reset)), setTypeErrorPass)
      } else {
        if (dataInput.contrasena !== dataInput.cncontrasena) {
          setTypeErrorPass({
            activeError: true,
            typeError: "Las contraseñas no coinciden"
          })
        }
      }
    } else {
      dispatch(ActiveErrorSpam({ msg: 'Faltan datos por completar, revisa el formulario.', active: true, typeError: 'error' }));
    }
  }
  return (
    <div className='App__dashboard__contPageOutlet__user__seguridad'>
      <form className='App__dashboard__contPageOutlet__user__seguridad__form' onSubmit={handleSubmit(onSubmit)}>
        <div className='App__dashboard__contPageOutlet__user__seguridad__form__contInputs'>
          <h2>Seguridad</h2>
          <div className='App__dashboard__contPageOutlet__user__seguridad__form__contInputs__dobleInp'>
            <label className='App__dashboard__contPageOutlet__user__seguridad__form__contInputs__dobleInp__label' htmlFor="">Modificar:</label>
            <SwitchButtonEdit activeEdition={activeEditionPass} setActiveEdition={() => setActiveEditionPass(!activeEditionPass)} />
          </div>

          <div className='App__dashboard__contPageOutlet__user__seguridad__form__contInputs__contPass'>
            <label htmlFor='contrasena'>Contraseña:</label>
            <div className='App__dashboard__contPageOutlet__user__seguridad__form__contInputs__contPass__showPass'>
              <input className='input_style' id='contrasena' type={showPass ? "password" : "text"} {...register('contrasena', { required: true, disabled: activeEditionPass })} placeholder='Nueva contraseña' />
              <FontAwesomeIcon icon={showPass ? faEye : faEyeLowVision} onClick={() => setShowPass(!showPass)} />
            </div>

            <label htmlFor='cncontrasena'>Confirmar nueva contraseña:</label>
            <div className='App__dashboard__contPageOutlet__user__seguridad__form__contInputs__contPass__showPass'>
              <input className='input_style' id='cncontrasena' type={showPass ? "password" : "text"} {...register('cncontrasena', { required: true, disabled: activeEditionPass })}
                placeholder='Confirma tu nueva contraseña' />
              <FontAwesomeIcon icon={showPass ? faEye : faEyeLowVision} onClick={() => setShowPass(!showPass)} />
            </div>

            <div className={typeErrorPass.activeError ? 'App__dashboard__contPageOutlet__user__seguridad__form__contInputs__contPass__passInvalid__active'
              : 'App__dashboard__contPageOutlet__user__seguridad__form__contInputs__contPass__passInvalid'}>
              <span>{typeErrorPass.typeError}</span>
            </div>
          </div>

          <div className='App__dashboard__contPageOutlet__user__seguridad__form__contInputs__dobleInp'>
            <label className='App__dashboard__contPageOutlet__user__seguridad__form__contInputs__dobleInp__label' htmlFor="">Modificar:</label>
            <SwitchButtonEdit activeEdition={activeEdition} setActiveEdition={() => setActiveEdition(!activeEdition)} />
          </div>

          <label htmlFor='nombre_usuario'>Nombre completo:</label>
          <input className='input_style' id='nombre_usuario' type="text" {...register('nombre_usuario', { required: true, disabled: activeEdition })}
            defaultValue={userData.nombre_usuario} />
          <label htmlFor='email'>Correo electrónico:</label>
          <input className='input_style' id='email' type="text" {...register('email', { required: true, disabled: activeEdition })}
            defaultValue={userData.correo} />
          <button className='btn_style' type='submit' >Actualizar</button>
        </div>
      </form >
    </div >
  )
}

export default Seguridad