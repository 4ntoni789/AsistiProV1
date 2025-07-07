import { faBan, faCalendar, faChevronCircleLeft, faChevronCircleRight, faEllipsisVertical, faEye, faFileContract, faFolder, faHome, faImagePortrait, faPencil, faPerson, faShop, faStore, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActivatedMenu } from '@renderer/actions/actionsLogin';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router';
import logo from '../../img/AsistiPropng.png';
import { useEffect, useRef, useState } from 'react';

function Menu(props) {
  const dispatch = useDispatch();
  const menuActive = useSelector((state: any) => state.menuAccions.menuActive);
  const dataUser = useSelector((state: any) => state.loginAccess.userLogin);

  return (
    <div className={menuActive ? 'App__dashboard__contMenu__active__menu' : 'App__dashboard__contMenu__menu'}>
      <div className={menuActive ? 'App__dashboard__contMenu__active__menu__headerMenu' : 'App__dashboard__contMenu__menu__headerMenu'}>
        <FontAwesomeIcon icon={menuActive ? faChevronCircleLeft : faChevronCircleRight} onClick={() => dispatch(ActivatedMenu(!menuActive))}
          title={menuActive ? 'Esconder' : 'Aparecer'} />
      </div>
      <div className='App__dashboard__contMenu__active__menu__titleUser'>
        <img className='App__loginPage__cont__contForm__contImg__imgLogo' src={logo} alt={document.title} />
      </div>
      <div className='App__dashboard__contMenu__active__menu__btnPage'>
        <NavLink to='init'><FontAwesomeIcon icon={faHome} />Inicio</NavLink>
      </div>
      <div className='App__dashboard__contMenu__active__menu__btnPage'>
        <NavLink to='pSale'><FontAwesomeIcon icon={faStore} />Puntos de ventas</NavLink>
      </div>
      <div className='App__dashboard__contMenu__active__menu__btnPage'>
        <NavLink to='employe'><FontAwesomeIcon icon={faImagePortrait} />Empleados</NavLink>
      </div>
      <div className='App__dashboard__contMenu__active__menu__btnPage'>
        <NavLink to='ausentismo'><FontAwesomeIcon icon={faCalendar} />Ausentismo</NavLink>
      </div>
      <div className='App__dashboard__contMenu__active__menu__btnPage'>
        <NavLink to='report'><FontAwesomeIcon icon={faFolder} />Reportes</NavLink>
      </div>
      <div className='App__dashboard__contMenu__active__menu__btnPage'>
        <NavLink to='contracts'><FontAwesomeIcon icon={faFileContract} />Contratos</NavLink>
      </div>
      <div className='App__dashboard__contMenu__active__menu__footerUser'>
        <div className='App__dashboard__contMenu__active__menu__footerUser__userLenght'>
          <h2>{dataUser.nombre_usuario[0]}</h2>
        </div>
        <div className='App__dashboard__contMenu__active__menu__footerUser__infoUser'>
          <h3>{dataUser.type_role}</h3>
          <h2>{dataUser.nombre_usuario}</h2>
        </div>
        <NavLink to='user'><FontAwesomeIcon icon={faEye} /></NavLink>
      </div>
    </div>
  );
}

export default Menu;