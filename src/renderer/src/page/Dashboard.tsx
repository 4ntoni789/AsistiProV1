import {  useSelector } from 'react-redux';
import '../css/dashboard.css';
import Menu from '@renderer/components/modal/Menu';

import { Outlet, useNavigate } from 'react-router';
import { useEffect } from 'react';

function Dashboard({ }) {
  const menuActive = useSelector((state: any) => state.menuAccions.menuActive);
  const userData = useSelector((state: any) => state.loginAccess.validationAccess);
  const navigate = useNavigate();

  useEffect(() => {
    navigate('init');
  }, [userData == true])

  return (
    <div className='App__dashboard'>
      <div className={menuActive ? 'App__dashboard__contMenu__active' : 'App__dashboard__contMenu'}><Menu /></div>
      <div className={menuActive ? 'App__dashboard__contPageOutlet' : 'App__dashboard__contPageOutlet__active'}>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;