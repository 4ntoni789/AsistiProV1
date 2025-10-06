import { useDispatch, useSelector } from 'react-redux';
import logo from '../img/AsistiProPng.png';
import { ValidationData } from '@renderer/actions/actionsLogin';
import { useForm } from 'react-hook-form';
import { DataLogin } from '@renderer/typesTS';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeLowVision, faRotate } from '@fortawesome/free-solid-svg-icons';
import { AppDispatch } from '@renderer/store';
import ErrorLoginSpan from './ErrorLogin';

function FormLogin() {
  // const [datos, setDatos] = useState();
  const userData = useSelector((state: any) => state.loginAccess.validationAccess);
  const loadingDataRest = useSelector((state: any) => state.loginAccess.loadingLogin);
  const { register, handleSubmit, reset } = useForm<DataLogin>();
  const [disableInput, setDisableInput] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState<boolean>(true);

  const onSubmit = (dataInput: DataLogin) => {
    dispatch(ValidationData(dataInput, reset));
  }

  useEffect(() => {
    if (userData) {
      setDisableInput(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    }
  }, [userData]);

  return (
    <div className='App__loginPage__cont__contForm'>
      <div className='App__loginPage__cont__contForm__contImg'>
        <img className='App__loginPage__cont__contForm__contImg__imgLogo' src={logo} alt={document.title} />
      </div>
      <form className='App__loginPage__cont__contForm__form' onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register('nombre_usuario', { required: true, disabled: disableInput })} placeholder='Nombre de usuario o correo' />
        <div className='App__loginPage__cont__contForm__form__showPassLogin'>
          <input id='contrasena' type={showPass ? "password" : "text"} {...register('contrasena', { required: true, disabled: disableInput })} placeholder='Contraseña' />
          <FontAwesomeIcon icon={showPass ? faEye : faEyeLowVision} onClick={() => setShowPass(!showPass)} />
        </div>
        <button className={loadingDataRest ? 'App__loginPage__cont__contForm__form__loadingBoton'
          : 'App__loginPage__cont__contForm__form__button'} type='submit' disabled={disableInput}><FontAwesomeIcon icon={faRotate} /> Iniciar sesión</button>
      </form>
      {!disableInput
        ? <div className='App__loginPage__cont__contForm__forgot'>
          <NavLink to={'/forgot'}>¿Olvidaste tu contraseña?</NavLink>
        </div>
        : null
      }
      <ErrorLoginSpan />
    </div>
  );
}

export default FormLogin;