import '../css/user.css';
import NavegacionConfiguracion from '@renderer/components/NavegacionConfiguracion';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

function Usuario({ }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('perfil');
  }, [])

  return (
    <div className='App__dashboard__contPageOutlet__user'>
      {/* <BtnDarkMode /> */}
      <NavegacionConfiguracion />
      <div className='App__dashboard__contPageOutlet__user__contOutlet'>
        <Outlet />
      </div>
    </div>
  );
}

export default Usuario;