import { useDispatch, useSelector } from 'react-redux';
import '../css/errorLogin.css';
import { useEffect } from 'react';
import { ErrorLogin } from '@renderer/actions/actionsLogin';

function ErrorLoginSpan(props) {
  const userData = useSelector((state: any) => state.loginAccess.activeError);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userData) {
      setTimeout(() => {
        dispatch(ErrorLogin(false));
      }, 2000)
    }
  }, [userData])

  return (
    <div className={userData ? 'App__loginPage__errorLogin__active' : 'App__loginPage__errorLogin'}>
      <span className='App__loginPage__errorLogin__textError'>Los datos ingresados no son validos</span>
    </div>
  );
}

export default ErrorLoginSpan;