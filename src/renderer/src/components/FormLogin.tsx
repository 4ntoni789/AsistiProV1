import { useDispatch, useSelector } from 'react-redux';
import logo from '../img/AsistiProPng.png';
import { ErrorLoginSpam, ValidationData } from '@renderer/actions/actionsLogin';
import { useForm } from 'react-hook-form';
import { DataLogin } from '@renderer/typesTS';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeLowVision } from '@fortawesome/free-solid-svg-icons';

function FormLogin() {
  // const [datos, setDatos] = useState();
  const userData = useSelector((state: any) => state.loginAccess.validationAccess);
  const { register, handleSubmit, reset } = useForm<DataLogin>();
  const [disableInput, setDisableInput] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState<boolean>(true);

  const onSubmit = async (dataInput: DataLogin) => {
    dispatch(ErrorLoginSpam(false));

    try {
      const response = await fetch('/api/validation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_usuario: dataInput.nombre_usuario,
          contrasena: dataInput.contrasena,
        }),
      });

      const result = await response.json();
      if (result.success) {
        dispatch(ValidationData(result.user));
        reset();
      } else {
        dispatch(ErrorLoginSpam(true));
      }

    } catch (error) {
      console.error('Error:', error);
    }
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
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs__contForm__showPassLogin'>
          <input id='contrasena' type={showPass ? "password" : "text"} {...register('contrasena', { required: true, disabled: disableInput })} placeholder='Contraseña' />
          <FontAwesomeIcon icon={showPass ? faEye : faEyeLowVision} onClick={() => setShowPass(!showPass)} />
        </div>
        <button type='submit' disabled={disableInput}>Iniciar sesión</button>
      </form>
    </div>
  );
}

export default FormLogin;