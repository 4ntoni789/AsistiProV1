import { faAddressCard, faCalendar, faChartGantt, faChevronCircleLeft, faChevronCircleRight, faEye, faFileContract, faFolder, faHome, faImagePortrait, faStore, faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router';
import logo from '../../img/AsistiPropng.png';
import logo2 from '../../img/AsistiProMinPng.png';
import '../../css/menu.css';
import { useEffect } from 'react';
import { ActivatedMenu } from '@renderer/actions/actionsMenu';

function Menu({ }) {
  const dispatch = useDispatch();
  const menuActive = useSelector((state: any) => state.menuAccions.menuActive);
  const dataUser = useSelector((state: any) => state.loginAccess.userLogin);
  const notificacion = useSelector((state: any) => state.menuAccions.notificacion);


  useEffect(() => {
    const storageKey = `uiOptions${dataUser.id_usuario}`;

    const memoriaStr = localStorage.getItem(storageKey);
    const memoriaAnterior = memoriaStr ? JSON.parse(memoriaStr) : {};

    const memoriaActualizada = {
      ...memoriaAnterior,
      menuActive,
      user: dataUser
    };

    localStorage.setItem(storageKey, JSON.stringify(memoriaActualizada));
  }, [menuActive])

  return (
    <div className={menuActive ? 'App__dashboard__contMenu__active__menu' : 'App__dashboard__contMenu__menu'}>
      <div className={menuActive ? 'App__dashboard__contMenu__active__menu__headerMenu' : 'App__dashboard__contMenu__menu__headerMenu'}>
        <FontAwesomeIcon icon={menuActive ? faChevronCircleLeft : faChevronCircleRight} onClick={() => dispatch(ActivatedMenu(!menuActive))}
          title={menuActive ? 'Esconder' : 'Aparecer'} />
      </div>
      <div className={menuActive ? 'App__dashboard__contMenu__active__menu__titleUser' : 'App__dashboard__contMenu__menu__titleUser'}>
        {
          menuActive ? <img className='App__loginPage__cont__contForm__contImg__imgLogo' src={logo} alt={document.title} /> :
            <img className='App__loginPage__cont__contForm__contImg__imgLogo' src={logo2} alt={document.title} />
        }
      </div>
      <div className={menuActive ? false ? 'App__dashboard__contMenu__active__menu__btnPageNotification' : 'App__dashboard__contMenu__active__menu__btnPage'
        : false ? 'App__dashboard__contMenu__menu__btnPageNotification' : 'App__dashboard__contMenu__menu__btnPage'} title='Inicio'>
        <NavLink to='init'
          className={({ isActive }) => isActive ? "App__dashboard__contMenu__active__menu__btnPage__activeBtn" : ""
          }><FontAwesomeIcon icon={faHome} /><b>Inicio</b></NavLink>
      </div>

      <div className={menuActive ? false ? 'App__dashboard__contMenu__active__menu__btnPageNotification' : 'App__dashboard__contMenu__active__menu__btnPage'
        : false ? 'App__dashboard__contMenu__menu__btnPageNotification' : 'App__dashboard__contMenu__menu__btnPage'} title='Punto de venta'>
        <NavLink to='pSale'
          className={({ isActive }) => isActive ? "App__dashboard__contMenu__active__menu__btnPage__activeBtn" : ""
          }><FontAwesomeIcon icon={faStore} /><b>Puntos de ventas</b></NavLink>
      </div>
      <div className={menuActive ? notificacion.tipo.filter((item) => (item.tipo === 'nuevas-marcaciones' || item.tipo === 'nuevas-empleado')).length > 0 ? 'App__dashboard__contMenu__active__menu__btnPageNotification' : 'App__dashboard__contMenu__active__menu__btnPage'
        : notificacion.tipo.filter((item) => (item.tipo === 'nuevas-marcaciones' || item.tipo === 'nuevas-empleado')).length > 0 ? 'App__dashboard__contMenu__menu__btnPageNotification' : 'App__dashboard__contMenu__menu__btnPage'} title='Empleados'>
        <NavLink to='employe'
          className={({ isActive }) => isActive ? "App__dashboard__contMenu__active__menu__btnPage__activeBtn" : ""
          }><FontAwesomeIcon icon={faImagePortrait} /><b>Empleados</b></NavLink>
      </div>

      <div className={menuActive ? false ? 'App__dashboard__contMenu__active__menu__btnPageNotification' : 'App__dashboard__contMenu__active__menu__btnPage'
        : false ? 'App__dashboard__contMenu__menu__btnPageNotification' : 'App__dashboard__contMenu__menu__btnPage'} title='Ausentismo'>
        <NavLink to='ausentismo'
          className={({ isActive }) => isActive ? "App__dashboard__contMenu__active__menu__btnPage__activeBtn" : ""
          }><FontAwesomeIcon icon={faCalendar} /><b>Ausentismo</b></NavLink>
      </div>

      <div className={menuActive ? notificacion.tipo.filter((item) => (item.tipo === 'contratos-vencer-vencidos')).length > 0 ? 'App__dashboard__contMenu__active__menu__btnPageNotification' : 'App__dashboard__contMenu__active__menu__btnPage'
        : notificacion.tipo.filter((item) => (item.tipo === 'contratos-vencer-vencidos')).length > 0 ? 'App__dashboard__contMenu__menu__btnPageNotification' : 'App__dashboard__contMenu__menu__btnPage'} title='Contratos'>
        <NavLink to='contracts'
          className={({ isActive }) => isActive ? "App__dashboard__contMenu__active__menu__btnPage__activeBtn" : ""
          }><FontAwesomeIcon icon={faFileContract} /><b>Contratos</b></NavLink>
      </div>

      <div className={menuActive ? notificacion.tipo.filter((item) => (item.tipo === 'nuevo-usuario')).length > 0 ? 'App__dashboard__contMenu__active__menu__btnPageNotification' : 'App__dashboard__contMenu__active__menu__btnPage'
        : notificacion.tipo.filter((item) => (item.tipo === 'nuevo-usuario')).length > 0 ? 'App__dashboard__contMenu__menu__btnPageNotification' : 'App__dashboard__contMenu__menu__btnPage'} title='Usuarios'>
        <NavLink to='users'
          className={({ isActive }) => isActive ? "App__dashboard__contMenu__active__menu__btnPage__activeBtn" : ""
          }><FontAwesomeIcon icon={faUser} /><b>Usuarios</b></NavLink>
      </div>

      <div className={menuActive ? false ? 'App__dashboard__contMenu__active__menu__btnPageNotification' : 'App__dashboard__contMenu__active__menu__btnPage'
        : false ? 'App__dashboard__contMenu__menu__btnPageNotification' : 'App__dashboard__contMenu__menu__btnPage'} title='Roles'>
        <NavLink to='roles'
          className={({ isActive }) => isActive ? "App__dashboard__contMenu__active__menu__btnPage__activeBtn" : ""
          }><FontAwesomeIcon icon={faChartGantt} /><b>Roles</b></NavLink>
      </div>

      <div className={menuActive ? false ? 'App__dashboard__contMenu__active__menu__btnPageNotification' : 'App__dashboard__contMenu__active__menu__btnPage'
        : false ? 'App__dashboard__contMenu__menu__btnPageNotification' : 'App__dashboard__contMenu__menu__btnPage'} title='Cargos'>
        <NavLink to='cargos'
          className={({ isActive }) => isActive ? "App__dashboard__contMenu__active__menu__btnPage__activeBtn" : ""
          }><FontAwesomeIcon icon={faAddressCard} /><b>Cargos</b></NavLink>
      </div>

      <div className={menuActive ? false ? 'App__dashboard__contMenu__active__menu__btnPageNotification' : 'App__dashboard__contMenu__active__menu__btnPage'
        : false ? 'App__dashboard__contMenu__menu__btnPageNotification' : 'App__dashboard__contMenu__menu__btnPage'} title='Empleadores'>
        <NavLink to='empleadores'
          className={({ isActive }) => isActive ? "App__dashboard__contMenu__active__menu__btnPage__activeBtn" : ""
          }><FontAwesomeIcon icon={faUserTie} /><b>Empleadores</b></NavLink>
      </div>

      <div className={menuActive ? false ? 'App__dashboard__contMenu__active__menu__btnPageNotification' : 'App__dashboard__contMenu__active__menu__btnPage'
        : false ? 'App__dashboard__contMenu__menu__btnPageNotification' : 'App__dashboard__contMenu__menu__btnPage'} title='Reportes'>
        <NavLink to='report'
          className={({ isActive }) => isActive ? "App__dashboard__contMenu__active__menu__btnPage__activeBtn" : ""
          }><FontAwesomeIcon icon={faFolder} /><b>Reportes</b></NavLink>
      </div>

      {
        menuActive ? <div className='App__dashboard__contMenu__active__menu__footerUser'>
          <div className='App__dashboard__contMenu__active__menu__footerUser__userLenght'>
            <h2>{dataUser.nombre_usuario[0].toUpperCase()}</h2>
          </div>
          <div className='App__dashboard__contMenu__active__menu__footerUser__infoUser'>
            <h3>{dataUser.type_role}</h3>
            <h2>{dataUser.nombre_usuario}</h2>
          </div>
          <NavLink to='user' title='Opciones de usuario'><FontAwesomeIcon icon={faEye} /></NavLink>
        </div> :
          <div className='App__dashboard__contMenu__menu__footerUser'>
            <div className='App__dashboard__contMenu__menu__footerUser__userLenght'>
              <NavLink to='user'
                className={({ isActive }) => isActive ? "App__dashboard__contMenu__menu__footerUser__userLenght__activeBtn" : ""
                } title='Opciones de usuario'>
                <h2>{dataUser.nombre_usuario[0].toUpperCase()}</h2>
              </NavLink>
            </div>
          </div>
      }
    </div>
  );
}

export default Menu;