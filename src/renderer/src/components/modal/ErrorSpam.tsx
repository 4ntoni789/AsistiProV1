import React, { useEffect } from 'react';
import '../../css/errorSpam.css';
import { useDispatch, useSelector } from 'react-redux';
import { ActiveErrorSpam } from '@renderer/actions/actionsLogin';

function ErrorSpam(props) {
  const userData = useSelector((state: any) => state.menuAccions.errorSpam);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      const interval = setTimeout(() => {
        dispatch(ActiveErrorSpam({ msg: '', active: false }));
      }, 2000)
      return () => {
        clearInterval(interval);
      }
    }
  }, [userData.active])

  return (
    <div className={userData.active ? `App__dashboard__errorSpam__active ${userData?.typeError}` : 'App__dashboard__errorSpam'}>
      <h2>{userData.msg}</h2>
    </div>
  );
}

export default ErrorSpam;