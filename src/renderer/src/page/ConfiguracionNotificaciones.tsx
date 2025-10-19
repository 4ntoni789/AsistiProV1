import { useDispatch, useSelector } from 'react-redux';
import '../css/configuracionNotificaciones.css';
import { useEffect, useState } from 'react';
import { AppDispatch } from '@renderer/store';
import { Fet_new_configuracion_notificaciones, Fetch_configuracion_notificaciones } from '@renderer/actions/actionsConfiguracionNotificaciones';
import { obtenerDatos } from '@renderer/scripts/obtenerDatosFetch';
import SwitchButtonEdit from '@renderer/components/SwitchButtonEdit';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

function ConfiguracionNotificaciones() {
  const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const dispatch = useDispatch<AppDispatch>();
  const [configuracionNotificaciones, setConfiguracionNotificaciones] = useState<[]>([]);
  const { register, handleSubmit, reset } = useForm();
  console.log(configuracionNotificaciones)

  useEffect(() => {
    obtenerDatos(dispatch(Fetch_configuracion_notificaciones(userData)), setConfiguracionNotificaciones);
    // dispatch(Fet_new_configuracion_notificaciones(null, userData.id_usuario, userData));
  }, [])

  return (
    <div className='App__dashboard__contPageOutlet__user__notificaciones'>
      <form className='App__dashboard__contPageOutlet__user__notificaciones__form'>
        <div className='App__dashboard__contPageOutlet__user__notificaciones__form__contInputs'>
          <h2>Configuración de notificaciones</h2>

          <div className='App__dashboard__contPageOutlet__user__notificaciones__form__contInputs__dobleInp'>
            <label className='App__dashboard__contPageOutlet__user__notificaciones__form__contInputs__dobleInp__label' htmlFor=""
            >Avisos automaticos <FontAwesomeIcon title='Este es un aviso que se le notifica al empleado via correo electrónico' icon={faQuestionCircle} /> :</label>
            <SwitchButtonEdit activeEdition={null} setActiveEdition={() => null} />
          </div>

          <div className='App__dashboard__contPageOutlet__user__notificaciones__form__contInputs__contInptCorreo'>
            <label htmlFor="">Copia de aviso automatico <FontAwesomeIcon title='--' icon={faQuestionCircle} /> :</label>
            <div className='App__dashboard__contPageOutlet__user__notificaciones__form__contInputs__contInptCorreo__newCorreo'>
              <input className='input_style' type='email' {...register('email', { required: true })} placeholder='Nuevo correo electrónico' />
              <FontAwesomeIcon icon={faPlus} title='Agregar nuevo correo electrónico de aviso' />
            </div>
            <input className='input_style' type='email' {...register('email', { required: true })} placeholder='Nuevo correo electrónico' />
          </div>


          <div className='App__dashboard__contPageOutlet__user__notificaciones__form__contInputs__dobleInp'>
            <label className='App__dashboard__contPageOutlet__user__notificaciones__form__contInputs__dobleInp__label' htmlFor="">Alertas de vencimiento de contratos :</label>
            <SwitchButtonEdit activeEdition={null} setActiveEdition={() => null} />
          </div>


          <button className='btn_style' type='submit' >Guardar</button>
        </div>
      </form>
    </div>
  )
}

export default ConfiguracionNotificaciones
