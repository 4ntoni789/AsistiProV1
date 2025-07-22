import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import '../../css/newUsers.css';
import SearchMunicipios from '../SearchMunicipios';
import { Opcion } from '@renderer/interface';
import { ActiveSubMenuNewEmpleado, Fetch_new_empleado } from '@renderer/actions/actionsEmpleados';
import { AppDispatch } from '@renderer/store';
import { obtenerDatos } from '@renderer/scripts/obtenerDatosFetch';
import { Fetch_cargos } from '@renderer/actions/actionsCargos';

function NewEmpleado() {
  const [nacionalidad, setNacionalidad] = useState<string>('');
  const [municipio, setMunicipio] = useState<Opcion | null>(null);
  const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const activeNewEmpleado = useSelector((state: any) => state.menuAccions.subMenuNewEmpleado.activeNewEmpleado);
  const [userRoles, setUserCargo] = useState<any>();
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch<AppDispatch>();
  const [lNacimiento, setLNacimiento] = useState<string>('');
  const [nacionalidadText, setNacionalidadText] = useState<string>('');
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);


  const onSubmit = async (dataInput) => {
    dispatch(Fetch_new_empleado(dataInput, userId, userData, municipio, reset));
  }

  useEffect(() => {
    obtenerDatos(null,dispatch(Fetch_cargos(userId)),setUserCargo);
  }, [activeNewEmpleado == true]);

  useEffect(() => {
    setMunicipio({
      label: `${lNacimiento}, ${nacionalidadText}`,
      value: `${lNacimiento}, ${nacionalidadText}`
    });
  }, [nacionalidadText, lNacimiento]);

  return (
    <div className={activeNewEmpleado ? 'App__dashboard__contPageOutlet__PageUsers__newUser__active' : 'App__dashboard__contPageOutlet__PageUsers__newUser'}>
      <form className='App__dashboard__contPageOutlet__PageUsers__newUser__form' onSubmit={handleSubmit(onSubmit)}>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__close'>
          <FontAwesomeIcon icon={faXmark} onClick={() => {
            dispatch(ActiveSubMenuNewEmpleado({ user: {}, activeNewEmpleado: false }));
            reset();
          }} />
        </div>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs'>
          <h2>Nuevo Empleado</h2>
          <label htmlFor='nombre_usuario'>Nombre completo</label>
          <input id='nombre_usuario' type="text" {...register('nombre_usuario', { required: true })} placeholder='Nombre completo' />
          <label htmlFor='apellidos'>Apellidos</label>
          <input id='apellidos' type="text" {...register('apellidos', { required: true })} placeholder='Apellidos' />
          <label htmlFor='cedula'>Numero de identificación</label>
          <input id='cedula' type="number" {...register('cedula', { required: true, minLength: 7, maxLength: 10 })} placeholder='Numero de cedula' />
          <label htmlFor='telefono'>Telefono</label>
          <input id='telefono' type="number" {...register('telefono', { required: true, minLength: 10 })} placeholder='Numero de telefono' />
          <label htmlFor='email'>Correo electronico</label>
          <input id='email' type="email" {...register('email', { required: true })} placeholder='Correo electronico' />
          <label htmlFor='direccion'>Dirección de residencial</label>
          <input id='direccion' type="text" {...register('direccion', { required: true })} placeholder='Dirección de residencial' />
          <label htmlFor='fecha_nacimiento'>Fecha de nacimiento</label>
          <input id='fecha_nacimiento' type="date" {...register('fecha_nacimiento', { required: true })} placeholder='Fecha de nacimiento' />
          <label>Nacionalidad</label>
          <select id="" onChange={(e) => setNacionalidad(e.target.value)}>
            <option value=''>-- Seleccione --</option>
            <option value="colombiano">Colombiano</option>
            <option value="otro">Otro</option>
          </select>
          {
            nacionalidad == 'colombiano' ? <SearchMunicipios seleccionado={municipio} setSeleccionado={setMunicipio} disable={!activeNewEmpleado} />
              :
              nacionalidad == 'otro' ? <>
                <label htmlFor='lNacimiento'>Lugar de nacimiento</label>
                <input id='lNacimiento' type="text" {...register('lNacimiento', { required: true })} placeholder='Lugar de nacimiento'
                  onChange={(e) => setLNacimiento(e.target.value)} />
                <label htmlFor='nacionalidadText'>Nacionalidad</label>
                <input id='nacionalidadText' type="text" {...register('nacionalidadText', { required: true })} placeholder='Nacionalidad'
                  onChange={(e) => setNacionalidadText(e.target.value)} />
              </> : null
          }
          <label htmlFor='sexo'>Sexo</label>
          <select id='sexo' {...register('sexo', { required: true })}>
            <option value=''>-- Seleccione --</option>
            <option value='M'>Masculino</option>
            <option value='F'>Femenino</option>
          </select>
          <button type='submit'>Registrar</button>
          <br />
        </div>
      </form>
    </div>
  );
}

export default NewEmpleado;