import { useEffect, useState } from 'react'
import logo from '../img/AsistiProPng.png';
import { NavLink, useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { Candado } from '@renderer/components/Candado';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { DataForgotPass } from '@renderer/typesTS';

function ForgotPass() {
  const [loadingDataRest, setLoadingDataRest] = useState<boolean>(false);
  const userData = useSelector((state: any) => state.loginAccess.validationAccess);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<DataForgotPass>();
  const [disableInput, setDisableInput] = useState<boolean>(false);
  const [unlock, setUnlock] = useState<boolean>(false);


  useEffect(() => {
    if (userData) {
      setDisableInput(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    }
  }, [userData]);

  const onSubmit = (dataInput) => {
    console.log(dataInput);
    setUnlock(true);
  }



  return (
    <div className='App__loginPage__cont__contForm' onSubmit={handleSubmit(onSubmit)}>
      <div className='App__loginPage__cont__contForm__contImg'>
        <img className='App__loginPage__cont__contForm__contImg__imgLogo' src={logo} alt={document.title} />
      </div>
      <div className='App__loginPage__cont__contForm__title'>
        <Candado isUnlocked={unlock} />
        <h4>¿Tienes problemas para iniciar sesión?</h4>
        <span>Ingresa tu correo electrónico, nombre de usuario y te enviaremos un codigo de verificación.</span>
      </div>
      <form className='App__loginPage__cont__contForm__form'>
        <input type="text" placeholder='Ingresa tu correo electrónico' {...register('correo_recuperacion', { required: true, disabled: disableInput })} />

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
