import { faBan, faCalendar, faChevronCircleLeft, faChevronCircleRight, faEllipsisVertical, faEye, faFileContract, faFolder, faHome, faImagePortrait, faPencil, faPerson, faShop, faStore, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActivatedMenu } from '@renderer/actions/actionsLogin';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router';
import logo from '../../img/AsistiPropng.png';
import logo2 from '../../img/AsistiProMinPng.png';
import '../../css/menu.css';
import { useEffect, useRef, useState } from 'react';

function Menu(props) {
  const dispatch = useDispatch();
  const menuActive = useSelector((state: any) => state.menuAccions.menuActive);
  const dataUser = useSelector((state: any) => state.loginAccess.userLogin);


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
      <div className={menuActive ? 'App__dashboard__contMenu__active__menu__btnPage' : 'App__dashboard__contMenu__menu__btnPage'}>
        <NavLink to='init'
          className={({ isActive }) => isActive ? "App__dashboard__contMenu__active__menu__btnPage__activeBtn" : ""
          }><FontAwesomeIcon icon={faHome} /><b>Inicio</b></NavLink>
      </div>

      <div className={menuActive ? 'App__dashboard__contMenu__active__menu__btnPage' : 'App__dashboard__contMenu__menu__btnPage'}>
        <NavLink to='pSale'
          className={({ isActive }) => isActive ? "App__dashboard__contMenu__active__menu__btnPage__activeBtn" : ""
          }><FontAwesomeIcon icon={faStore} /><b>Puntos de ventas</b></NavLink>
      </div>
      <div className={menuActive ? 'App__dashboard__contMenu__active__menu__btnPage' : 'App__dashboard__contMenu__menu__btnPage'}>
        <NavLink to='employe'
          className={({ isActive }) => isActive ? "App__dashboard__contMenu__active__menu__btnPage__activeBtn" : ""
          }><FontAwesomeIcon icon={faImagePortrait} /><b>Empleados</b></NavLink>
      </div>

      <div className={menuActive ? 'App__dashboard__contMenu__active__menu__btnPage' : 'App__dashboard__contMenu__menu__btnPage'}>
        <NavLink to='ausentismo'
          className={({ isActive }) => isActive ? "App__dashboard__contMenu__active__menu__btnPage__activeBtn" : ""
          }><FontAwesomeIcon icon={faCalendar} /><b>Ausentismo</b></NavLink>
      </div>

      <div className={menuActive ? 'App__dashboard__contMenu__active__menu__btnPage' : 'App__dashboard__contMenu__menu__btnPage'}>
        <NavLink to='report'
          className={({ isActive }) => isActive ? "App__dashboard__contMenu__active__menu__btnPage__activeBtn" : ""
          }><FontAwesomeIcon icon={faFolder} /><b>Reportes</b></NavLink>
      </div>
      <div className={menuActive ? 'App__dashboard__contMenu__active__menu__btnPage' : 'App__dashboard__contMenu__menu__btnPage'}>
        <NavLink to='contracts'
          className={({ isActive }) => isActive ? "App__dashboard__contMenu__active__menu__btnPage__activeBtn" : ""
          }><FontAwesomeIcon icon={faFileContract} /><b>Contratos</b></NavLink>
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