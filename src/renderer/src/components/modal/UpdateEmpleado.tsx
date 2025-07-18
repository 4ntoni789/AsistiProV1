import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActiveErrorSpam, ActiveSubMenuDeleteUsers, ActiveSubMenuEmpleado } from '@renderer/actions/actionsLogin';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import SwitchButtonEdit from '../SwitchButtonEdit';
import BuscadorMunicipios from '../SearchMunicipios';
import { Opcion } from '@renderer/interface';

function UpdateEmpleado(props) {
  const activeNewEmpleado = useSelector((state: any) => state.menuAccions.subMenuEmpleado);
  const [municipio, setMunicipio] = useState<Opcion | null>(activeNewEmpleado.user.lugar_nacimiento);
  const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const [activeEdition, setActiveEdition] = useState(true);
  const [userCargo, setUserCargo] = useState<any>();
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);

  const onSubmit = async (dataInput) => {
    try {
      const response = await fetch(`/api/empleados/${activeNewEmpleado.user.id_empleado}`, {
        method: 'PUT',
        headers: {
          'x-id-usuario': userId
        }
        ,
        body: JSON.stringify({
          nombres: dataInput.nombre_usuario,
          apellidos: dataInput.apellidos,
          cedula: dataInput.cedula,
          telefono: dataInput.telefono,
          correo: dataInput.email,
          sexo: dataInput.sexo,
          lugar_nacimiento: municipio?.label,
          fecha_nacimiento: dataInput.fecha_nacimiento,
          direccion: dataInput.direccion,
          reqUser: userData
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      dispatch(ActiveSubMenuEmpleado({ user: {}, subMenuEmpleado: false }));
      reset();
      dispatch(ActiveErrorSpam({ msg: 'Empleado actualizado', active: true, typeError: 'submit' }));
    } catch (error) {
      dispatch(ActiveSubMenuEmpleado({ user: {}, subMenuEmpleado: false }));
      dispatch(ActiveErrorSpam({ msg: 'Error al actualizar el empleado', active: true, typeError: 'Error' }));
      console.log('Ocurrió un error al actualizar el empleado');
    }
  }

  useEffect(() => {
    setActiveEdition(true);
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
  }, [activeNewEmpleado.subMenuEmpleado == true]);

  return (
    <>
      <form className='App__dashboard__contPageOutlet__PageUsers__newUser__form' onSubmit={handleSubmit(onSubmit)}>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__close'>
          <FontAwesomeIcon icon={faXmark} onClick={() => dispatch(ActiveSubMenuEmpleado({ user: {}, subMenuEmpleado: false }))} />
        </div>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__dataUser'>
          <h2>Información del trabajador</h2>
          <br />
          <span>Nombres: <b>{activeNewEmpleado.user.nombres}</b></span>
          <span>Apellidos: <b>{activeNewEmpleado.user.apellidos}</b></span>
          <span>Cedula: <b>{activeNewEmpleado.user.cedula}</b></span>
          <span>Telefono: <b>{activeNewEmpleado.user.telefono}</b></span>
          <span>Correo: <b>{activeNewEmpleado.user.correo}</b></span>
          <span>Id: <b>{activeNewEmpleado.user.id_empleado}</b></span>
          <span>Sexo: <b>{activeNewEmpleado.user.sexo}</b></span>
          <span>Lugar de nacimiento: <b>{activeNewEmpleado.user.lugar_nacimiento}</b></span>
          <span>Fecha de nacimiento: <b>{activeNewEmpleado.user.fecha_nacimiento?.toString().split('T')[0]}</b></span>
        </div>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs'>
          {/* <h2>Editar a {activeNewEmpleado.user.nombres == undefined ? 'Empleado' : activeNewEmpleado.user.nombres}</h2> */}
          <br />
          <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs__check'>
            <label htmlFor="">Editar:</label>
            <SwitchButtonEdit activeEdition={activeEdition} setActiveEdition={() => setActiveEdition(!activeEdition)} />
          </div>
          <label htmlFor='nombre_usuario'>Nombre completo</label>
          <input id='nombre_usuario' type="text" {...register('nombre_usuario', { required: true, disabled: activeEdition })} placeholder='Nombre completo' defaultValue={activeNewEmpleado.user.nombres} />
          <label htmlFor='apellidos'>Apellidos</label>
          <input id='apellidos' type="text" {...register('apellidos', { required: true, disabled: activeEdition })} placeholder='Apellidos' defaultValue={activeNewEmpleado.user.apellidos} />
          <label htmlFor='cedula'>Numero de cedula</label>
          <input id='cedula' type="number" {...register('cedula', { required: true, disabled: activeEdition })} placeholder='Numero de cedula' defaultValue={activeNewEmpleado.user.cedula} />
          <label htmlFor='telefono'>Telefono</label>
          <input id='telefono' type="number" {...register('telefono', { required: true, disabled: activeEdition })} placeholder='Numero de telefono' defaultValue={activeNewEmpleado.user.telefono} />
          <label htmlFor='email'>Correo electronico</label>
          <input id='email' type="email" {...register('email', { required: true, disabled: activeEdition })} placeholder='Correo electronico' defaultValue={activeNewEmpleado.user.correo} />
          <label htmlFor='direccion'>Direccion residencial</label>
          <input id='direccion' type="text" {...register('direccion', { required: true, disabled: activeEdition })} placeholder='Dirección residencial' defaultValue={activeNewEmpleado.user.direccion} />
          <label htmlFor='fecha_nacimiento'>Fecha de nacimiento</label>
          <input id='fecha_nacimiento' type="date" {...register('fecha_nacimiento', { required: true, disabled: activeEdition })} defaultValue={activeNewEmpleado.user.fecha_nacimiento?.toString().split('T')[0]} placeholder='Fecha de nacimiento' />
          <BuscadorMunicipios seleccionado={municipio} setSeleccionado={setMunicipio} disable={activeEdition} />
          <label htmlFor='sexo'>Sexo</label>
          <select id='sexo' {...register('sexo', { required: true, disabled: activeEdition })}>
            {
              activeNewEmpleado.user.sexo == 'F' ? <>
                <option selected value='F'>Femenino</option>
                <option value='M'>Masculino</option>
              </>
                :
                <>
                  <option value='M'>Masculino</option>
                  <option value='F'>Femenino</option>
                </>

            }
          </select>
          <button type='submit' disabled={activeEdition}>Actualizar</button>
          <input type="button" value="Eliminar empleado" className='App__dashboard__contPageOutlet__PageUsers__newUser__active__btnRemove' onClick={() => {
            dispatch(ActiveSubMenuDeleteUsers({
              user: activeNewEmpleado.user,
              activeDeleteUsers: true,
              typeRemove: 'Empleado'
            }))
            dispatch(dispatch(ActiveSubMenuEmpleado({ user: activeNewEmpleado.user, subMenuEmpleado: false })))
          }} />
        </div>
      </form></>
  );
}

export default UpdateEmpleado;