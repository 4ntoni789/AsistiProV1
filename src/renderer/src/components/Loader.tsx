import { useEffect, useState } from 'react';
import '../css/loader.css';
import { useSelector } from 'react-redux';

function Loader() {
  const userData = useSelector((state: any) => state.loginAccess.validationAccess);
  const [activeLoader, setActiveLoader] = useState<boolean>(userData);

  useEffect(() => {
    setActiveLoader(userData);
    setTimeout(() => {
      setActiveLoader(false);
    }, 3000);
    
  },[userData]);

  return (
    <div className={activeLoader ? 'loader__active' : 'loader__noActive'}>

    </div>
  );
}

export default Loader;