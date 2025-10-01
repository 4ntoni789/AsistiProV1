import '../css/navegacionConfiguracion.css';
import { NavLink } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faGear, faShield, faUser } from '@fortawesome/free-solid-svg-icons';

function NavegacionConfiguracion() {
  return (
    <div className='App__dashboard__contPageOutlet__user__contNavegacion'>

      <div className='App__dashboard__contPageOutlet__user__contNavegacion__option'>
        <NavLink to='perfil'
          className={({ isActive }) => isActive ? "App__dashboard__contPageOutlet__user__contNavegacion__option__activeBtn" : ""
          }><FontAwesomeIcon icon={faUser} /><b>Perfil</b></NavLink>
      </div>

      <div className='App__dashboard__contPageOutlet__user__contNavegacion__option'>
        <NavLink to='seguridad'
          className={({ isActive }) => isActive ? "App__dashboard__contPageOutlet__user__contNavegacion__option__activeBtn" : ""
          }><FontAwesomeIcon icon={faShield} /><b>Seguridad</b></NavLink>
      </div>


      <div className='App__dashboard__contPageOutlet__user__contNavegacion__option'>
        <NavLink to='notificaciones'
          className={({ isActive }) => isActive ? "App__dashboard__contPageOutlet__user__contNavegacion__option__activeBtn" : ""
          }><FontAwesomeIcon icon={faBell} /><b>Notificaciones</b></NavLink>
      </div>

      <div className='App__dashboard__contPageOutlet__user__contNavegacion__option'>
        <NavLink to='configuracion'
          className={({ isActive }) => isActive ? "App__dashboard__contPageOutlet__user__contNavegacion__option__activeBtn" : ""
          }><FontAwesomeIcon icon={faGear} /><b>Configuración</b></NavLink>
      </div>

    </div>
  )
}

export default NavegacionConfiguracion
