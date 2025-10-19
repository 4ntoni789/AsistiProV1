import '../css/loginPage.css';
import { useSelector } from 'react-redux';
import banner from '../img/Group.png';
import { Outlet, useNavigate } from 'react-router';
import { useEffect } from 'react';


function Login() {
  const userData = useSelector((state: any) => state.loginAccess.validationAccess);
  const navigate = useNavigate();

  useEffect(() => {
    navigate('formLogin');
  }, [])

  return (
    <div className='App__loginPage'>
      <div className={userData ? 'App__loginPage__cont__success' : 'App__loginPage__cont'}>
        <Outlet />
      </div>
      <div className={userData ? 'App__loginPage__contBanner__success' : 'App__loginPage__contBanner'}>
        <div className='App__loginPage__contBanner__banner'>
          <img className='App__loginPage__cont__contForm__contImg__imgLogo' src={banner} />
        </div>
      </div>
    </div>
  );
}

export default Login;