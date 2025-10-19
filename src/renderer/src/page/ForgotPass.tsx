import { useEffect, useState } from 'react'
import logo from '../img/AsistiProPng.png';
import { NavLink, useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { Candado } from '@renderer/components/Candado';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { DataForgotPass } from '@renderer/typesTS';
import { AppDispatch } from '@renderer/store';
import { Fetch_forgot_password, Fetch_forgot_password_verify } from '@renderer/actions/actionsLogin';
import Temporizador from '@renderer/components/Temporizador';
import { obtenerDatos } from '@renderer/scripts/obtenerDatosFetch';
import VisualSixInputsVerifyCode from '@renderer/components/VisualInput';
import RestablecerContrasenaForgotPass from '@renderer/components/RestablecerContrasenaForgotPass';

function ForgotPass() {
  const [loadingDataRest, setLoadingDataRest] = useState<boolean>(false);
  const userData = useSelector((state: any) => state.loginAccess.validationAccess);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<DataForgotPass>();
  const [disableInput, setDisableInput] = useState<boolean>(false);
  const [unlock, setUnlock] = useState<boolean>(false);
  const [codigoEnviado, setCodigoEnviado] = useState<boolean>(false);
  const [disableCodigoRecuperacion, setDisableCodigoRecuperacion] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const [code, setCode] = useState<string>('');
  const [finalizarContador, setFinalizarContador] = useState<boolean>(false);
  const [identificador, setIdentificador] = useState<string>('');

  useEffect(() => {
    if (userData) {
      setDisableInput(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    }
    else if (codigoEnviado) {
      setDisableInput(true);
      setDisableCodigoRecuperacion(false);
    } else if (!codigoEnviado) {
      setDisableCodigoRecuperacion(true);
    }
  }, [userData, codigoEnviado]);

  const onSubmit = (dataInput) => {
    if (!codigoEnviado) {
      setIdentificador(dataInput.correo_recuperacion);
      dispatch(Fetch_forgot_password(dataInput, () => {
        setCodigoEnviado(true);
      }));
    } else {
      dispatch(Fetch_forgot_password_verify({
        correo_recuperacion: identificador,
        code: code
      }, () => {
        setCodigoEnviado(false);
        setUnlock(true);
        setFinalizarContador(true);
      }))
    }
  }

  return (
    <div className='App__loginPage__cont__contForm' >
      <div className='App__loginPage__cont__contForm__contImg'>
        <img className='App__loginPage__cont__contForm__contImg__imgLogo' src={logo} alt={document.title} />
      </div>

      {
        codigoEnviado ?
          <div className='App__loginPage__cont__contForm__title'>
            <Candado isUnlocked={unlock} />
            <h4>Ingresa el código de verificación</h4>
            <span>Hemos enviado un código de verificación a la dirección proporcionada, ingresa el código en el tiempo establecido.</span>
            <Temporizador activar={codigoEnviado} finalizar={finalizarContador} />
          </div>
          :
          <div className='App__loginPage__cont__contForm__title'>
            <Candado isUnlocked={unlock} />
            <h4>¿Tienes problemas para iniciar sesión?</h4>
            <span>Ingresa tu correo electrónico, nombre de usuario y te enviaremos un código de verificación.</span>
          </div>
      }

      <form className='App__loginPage__cont__contForm__form' onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder='Ingresa tu correo electrónico' {...register('correo_recuperacion', { required: true, disabled: disableInput })} />
        <VisualSixInputsVerifyCode name="codigo_recuperacion" setValue={setCode} disabled={disableCodigoRecuperacion} />
        
        <button className={loadingDataRest ? 'App__loginPage__cont__contForm__form__loadingBoton'
          : 'App__loginPage__cont__contForm__form__button'} type='submit' ><FontAwesomeIcon icon={faRotate} /> Enviar verificación</button>
      </form>

      <div className='App__loginPage__cont__contForm__forgot'>
        <NavLink to={'/formLogin'}>Iniciar sesión</NavLink>
      </div>
    </div>
  )
}

export default ForgotPass
