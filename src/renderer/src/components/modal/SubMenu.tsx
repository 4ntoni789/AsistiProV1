import { faAddressCard, faArrowRightToBracket, faChartGantt, faGear, faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';
import '../../css/subMenu.css';
import { useDispatch, useSelector } from 'react-redux';

import { NavLink } from 'react-router';
import { ActiveSubMenu } from '@renderer/actions/actionsMenu';
import { ActiveSubMenuDeleteUsers } from '@renderer/actions/actionsUsers';

function SubMenu({ }) {
  const dispatch = useDispatch();
  const menuActive = useSelector((state: any) => state.menuAccions.subMenuActive);
  const buttonRef = useRef<any | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;

      if (buttonRef.current && !buttonRef.current.contains(target)) {
        dispatch(ActiveSubMenu(false))
      }
    };

    if (menuActive) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [menuActive]);;

  return (
    <div className={menuActive ? 'App__dashboard__subMenu__active' : 'App__dashboard__subMenu'}>
      <div className='App__dashboard__subMenu__btn' title='Opciones'>
        <FontAwesomeIcon icon={faGear} ref={buttonRef} onClick={() => dispatch(ActiveSubMenu(!menuActive))} />
      </div>
      <div className={menuActive ? 'App__dashboard__subMenu__contBtn__active' : 'App__dashboard__subMenu__contBtn'}>
        <div className='App__dashboard__subMenu__contBtn__btn'>
          <NavLink to='users' onClick={() => dispatch(ActiveSubMenu(false))}><FontAwesomeIcon icon={faUser} /> Usuarios</NavLink>
        </div>
        <div className='App__dashboard__subMenu__contBtn__btn'>
          <NavLink to='roles' onClick={() => dispatch(ActiveSubMenu(false))}><FontAwesomeIcon icon={faChartGantt} /> Roles</NavLink>
        </div>
        <div className='App__dashboard__subMenu__contBtn__btn'>
          <NavLink to='cargos' onClick={() => dispatch(ActiveSubMenu(false))}><FontAwesomeIcon icon={faAddressCard} /> Cargos</NavLink>
        </div>
        <div className='App__dashboard__subMenu__contBtn__btn'>
          <NavLink to='empleadores' onClick={() => dispatch(ActiveSubMenu(false))}><FontAwesomeIcon icon={faUserTie} /> Empleadores</NavLink>
        </div>
        <div className='App__dashboard__subMenu__contBtn__btn'>
          <span onClick={() => {
            dispatch(ActiveSubMenuDeleteUsers({
              user: {},
              activeDeleteUsers: true,
              typeRemove: 'Logout'
            }))
          }}><FontAwesomeIcon icon={faArrowRightToBracket} /> Cerrar sesión</span>
        </div>
      </div>
    </div>
  );
}

export default SubMenu;