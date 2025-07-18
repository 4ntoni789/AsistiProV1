import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActiveErrorSpam, ActiveSubMenuNewEmpleado, ActiveSubMenuNewUsers } from '@renderer/actions/actionsLogin';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import '../../css/newUsers.css';
import { capitalizarCadaPalabra } from '@renderer/scripts/upper';
import SearchMunicipios from '../SearchMunicipios';
import { Opcion } from '@renderer/interface';

function NewEmpleado() {
  const [nacionalidad, setNacionalidad] = useState<string>('');
  const [municipio, setMunicipio] = useState<Opcion | null>(null);
  const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const activeNewEmpleado = useSelector((state: any) => state.menuAccions.subMenuNewEmpleado.activeNewEmpleado);
  const [userRoles, setUserCargo] = useState<any>();
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const [lNacimiento, setLNacimiento] = useState<string>('');
  const [nacionalidadText, setNacionalidadText] = useState<string>('');
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);


  const onSubmit = async (dataInput) => {
    try {
      const response = await fetch('/api/empleados', {
        method: 'POST',
        headers: {
          'x-id-usuario': userId,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre_usuario: capitalizarCadaPalabra(dataInput.nombre_usuario),
          apellido: capitalizarCadaPalabra(dataInput.apellidos),
          cedula: dataInput.cedula,
          telefono: dataInput.telefono,
          email: dataInput.email,
          sexo: dataInput.sexo,
          lugar_nacimiento: municipio?.label,
          fecha_nacimiento: dataInput.fecha_nacimiento,
          direccion: dataInput.direccion,
          reqUser: userData
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      // console.log(result.message);
      dispatch(ActiveErrorSpam({ msg: 'Empleado creado', active: true, typeError: 'submit' }));
      reset();
      dispatch(ActiveSubMenuNewEmpleado({ user: {}, activeNewEmpleado: false }))
    } catch (error) {
      dispatch(ActiveErrorSpam({ msg: 'Error al crear el Empleado', active: true, typeError: 'Error' }));
      console.error('Error:', error);
      console.log('Ocurrió un error al crear el empleado');
    }
  }

  useEffect(() => {
    fetch('/api/cargos', {
      headers: {
        'x-id-usuario': userId
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setUserCargo(data);
      })
      .catch((err) => console.error('Error:', err));
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
          <input id='email' type="text" {...register('email', { required: true })} placeholder='Correo electronico' />
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
        {/* <label>
                    <input type="checkbox" onClick={(e: any) => e.target.checked ? setUserActiveCheck('activo') : setUserActiveCheck('inactivo')} {...register('estado')} />
                    Activo
                </label> */}
      </form>
    </div>
  );
}

export default NewEmpleado;