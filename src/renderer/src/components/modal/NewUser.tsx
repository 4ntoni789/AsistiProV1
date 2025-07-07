import { useForm } from 'react-hook-form';
import '../../css/newUsers.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeLowVision, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { ActiveErrorSpam, ActiveSubMenuNewUsers } from '@renderer/actions/actionsLogin';
import { useEffect, useState } from 'react';

function NewUser() {
  const activeNewUsers = useSelector((state: any) => state.menuAccions.subMenuNewUsers);
  const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const [userActiveCheck, setUserActiveCheck] = useState<string>('inactivo');
  const [userRoles, setUserRoles] = useState<any>();
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState<boolean>(true);
  const [typeErrorPass, setTypeErrorPass] = useState<{ activeError: boolean, typeError: string }>({
    activeError: false,
    typeError: ''
  });

  const onSubmit = async (dataInput) => {
    try {
      const response = await fetch('/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_usuario: dataInput.nombre_usuario,
          password: dataInput.contrasena,
          id_rol: dataInput.id_rol,
          estado: userActiveCheck,
          email: dataInput.email,
          reqUser: userData
        }),
      });

      const result = await response.json();
      if (response.ok) {
        dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'submit' }));
        reset();
        dispatch(ActiveSubMenuNewUsers(false));
        setTypeErrorPass({
          activeError: false,
          typeError: ''
        });
      } else {
        setTypeErrorPass({
          activeError: true,
          typeError: result.message
        });
        dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'Error' }));
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('Ocurrió un error al crear el usuario');
    }
  }

  useEffect(() => {
    fetch('/api/roles')
      .then((res) => res.json())
      .then((data) => {
        setUserRoles(data);
      })
      .catch((err) => console.error('Error:', err));
  }, [activeNewUsers == true]);

  return (
    <div className={activeNewUsers ? 'App__dashboard__contPageOutlet__PageUsers__newUser__active' : 'App__dashboard__contPageOutlet__PageUsers__newUser'}>
      <form className='App__dashboard__contPageOutlet__PageUsers__newUser__form' onSubmit={handleSubmit(onSubmit)}>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__close'>
          <FontAwesomeIcon icon={faXmark} onClick={() => dispatch(ActiveSubMenuNewUsers(false))} />
        </div>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs'>
          <h2>Nuevo usuario</h2>
          <label htmlFor='nombre_usuario'>Nombre completo</label>
          <input id='nombre_usuario' type="text" {...register('nombre_usuario', { required: true })} placeholder='Nombre completo' />
          <label htmlFor='email'>Correo electronico</label>
          <input id='email' type="text" {...register('email', { required: true })} placeholder='Correo electronico' />
          <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs__contForm'>
            <label htmlFor='contrasena'>Contraseña</label>
            <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs__contForm__showPass'>
              <input id='contrasena' type={showPass ? "password" : "text"} {...register('contrasena', { required: true })} placeholder='Nueva contraseña' />
              <FontAwesomeIcon icon={showPass ? faEye : faEyeLowVision} onClick={() => setShowPass(!showPass)} />
            </div>
            <div className={typeErrorPass.activeError ? 'App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs__contForm__passInvalid__active'
              : 'App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs__contForm__passInvalid'}>
              <span>{typeErrorPass.typeError}</span>
            </div>
          </div>
          <label htmlFor='id_rol'>Rol</label>
          <select id='id_rol' {...register('id_rol', { required: true })}>
            <option value=''>-- Seleccione --</option>
            {
              userRoles?.map((item, i) => (
                <option key={i} value={item.id_rol}>{item.nombre_rol}</option>
              ))
            }
          </select>
          <label>
            <input type="checkbox" onClick={(e: any) => e.target.checked ? setUserActiveCheck('activo') : setUserActiveCheck('inactivo')} {...register('estado')} />
            Activo
          </label>
          <button type='submit'>Registrar</button>

        </div>
      </form>
    </div>
  );
}

export default NewUser;