import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import '../../css/newEmpleado.css';
import '../../css/inputStyle.css';
import '../../css/btnStyle.css';
import '../../css/scrolBar.css';
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

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      dispatch(ActiveSubMenuNewEmpleado({ user: {}, activeNewEmpleado: false }));

    }
  };


  const onSubmit = async (dataInput) => {
    dispatch(Fetch_new_empleado(dataInput, userId, userData, municipio, reset));
  }

  useEffect(() => {
    obtenerDatos(null, dispatch(Fetch_cargos(userId)), setUserCargo);
  }, [activeNewEmpleado == true]);

  useEffect(() => {
    setMunicipio({
      label: `${lNacimiento}, ${nacionalidadText}`,
      value: `${lNacimiento}, ${nacionalidadText}`
    });
  }, [nacionalidadText, lNacimiento]);

  return (
    <div ref={modalRef} className={activeNewEmpleado ? 'App__dashboard__contPageOutlet__PageUsers__newEmpleado__active' : 'App__dashboard__contPageOutlet__PageUsers__newEmpleado'} onClick={handleClickOutside}>
      <form className={activeNewEmpleado ? 'App__dashboard__contPageOutlet__PageUsers__newEmpleado__active__form scrollBar' : 'App__dashboard__contPageOutlet__PageUsers__newEmpleado__form'} onSubmit={handleSubmit(onSubmit)}>
        <div className='App__dashboard__contPageOutlet__PageUsers__newEmpleado__form__close'>
          <FontAwesomeIcon icon={faXmark} onClick={() => {
            dispatch(ActiveSubMenuNewEmpleado({ user: {}, activeNewEmpleado: false }));
            reset();
          }} />
        </div>
        <div className='App__dashboard__contPageOutlet__PageUsers__newEmpleado__form__contInputs'>
          <div className='App__dashboard__contPageOutlet__PageUsers__newEmpleado__form__contInputs__header'>
            <h2><b>Nuevo Empleado</b></h2>
          </div>
          <input className='input_style' id='nombre_usuario' type="text" {...register('nombre_usuario', { required: true })} placeholder='Nombre completo' />
          <input className='input_style' id='apellidos' type="text" {...register('apellidos', { required: true })} placeholder='Apellidos' />
          <input className='input_style' id='cedula' type="number" {...register('cedula', { required: true, minLength: 7, maxLength: 10 })} placeholder='Numero de cedula' />
          <input className='input_style' id='telefono' type="number" {...register('telefono', { required: true, minLength: 10 })} placeholder='Numero de telefono' />
          <input className='input_style' id='email' type="email" {...register('email', { required: true })} placeholder='Correo electronico' />
          <input className='input_style' id='direccion' type="text" {...register('direccion', { required: true })} placeholder='Dirección de residencial' />
          <input className='input_style' id='fecha_nacimiento' type="date" {...register('fecha_nacimiento', { required: true })} placeholder='Fecha de nacimiento' />
          <select className='input_style' id="" onChange={(e) => setNacionalidad(e.target.value)}>
            <option value=''>-- Nacionalidad --</option>
            <option value="colombiano">Colombiano</option>
            <option value="otro">Otro</option>
          </select>
          {
            nacionalidad == 'colombiano' ? <SearchMunicipios seleccionado={municipio} setSeleccionado={setMunicipio} disable={!activeNewEmpleado} />
              :
              nacionalidad == 'otro' ? <>
                
                <input className='input_style' id='lNacimiento' type="text" {...register('lNacimiento', { required: true })} placeholder='Lugar de nacimiento'
                  onChange={(e) => setLNacimiento(e.target.value)} />
                
                <input className='input_style' id='nacionalidadText' type="text" {...register('nacionalidadText', { required: true })} placeholder='Nacionalidad'
                  onChange={(e) => setNacionalidadText(e.target.value)} />
              </> : null
          }
          
          <select className='input_style' id='sexo' {...register('sexo', { required: true })}>
            <option value=''>-- Sexo --</option>
            <option value='M'>Masculino</option>
            <option value='F'>Femenino</option>
          </select>
          <button className='btn_style' type='submit'>Registrar</button>
          <br />
        </div>
      </form>
    </div>
  );
}

export default NewEmpleado;