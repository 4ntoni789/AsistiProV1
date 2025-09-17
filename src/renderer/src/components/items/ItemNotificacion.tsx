import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import '../../css/itemNotificacion.css';
import { validarIcon } from '@renderer/scripts/validadorIcon';
import { useSelector } from 'react-redux';
import { UserDataType } from '@renderer/typesTS';

function ItemNotificacion({ info }) {
  const [cerrando, setCerrando] = useState<boolean>(false);
  const [detalles, setDetalles] = useState<boolean>(false);
  const [persistenciaNotificacion, setPersistenciaNotificacion] = useState(false);
  const userData = useSelector((state: UserDataType) => state.loginAccess.userLogin);

  useEffect(() => {
    console.log(info);
    if (persistenciaNotificacion === false) {
      const interval = setTimeout(() => {
        setCerrando(true);
      }, 5000)
      return () => clearTimeout(interval);
    }
  }, [persistenciaNotificacion])

  return (
    <div onMouseEnter={() => setPersistenciaNotificacion(true)} onMouseLeave={() => setPersistenciaNotificacion(false)}
      className={`contNotificaciones__contNotificaciones__contInfo`}>
      <div className={`contNotificaciones__contNotificaciones__contInfo__notificacion ${cerrando ? 'salir' : ''}`}>
        <div className='contNotificaciones__contNotificaciones__contInfo__notificacion__contIco'>
          <FontAwesomeIcon icon={validarIcon(info.tipo)} />
        </div>
        <div className='contNotificaciones__contNotificaciones__contInfo__notificacion__info'>
          {info.tipo === 'login' ? <b>{info.data.texto} Bienvenido {userData?.nombre_usuario}</b> : <b>{info.data.texto}</b>}
          <b>{new Date(info.data.fecha).toLocaleTimeString("es-CO", {
            hour12: false,
          })}</b>
        </div>
        <div className='contNotificaciones__contNotificaciones__contInfo__notificacion__contButtons'>
          <button onClick={() => setCerrando(true)}><FontAwesomeIcon icon={faXmark} /></button>
          {info.data.detalles ? <button onClick={() => setDetalles(!detalles)}>Detalles</button> : null}

        </div>
      </div>
      <div className={detalles && cerrando === false ? 'contNotificaciones__contNotificaciones__contInfo__detalles__active'
        : 'contNotificaciones__contNotificaciones__contInfo__detalles'}>
        <b>{info.data.detalles}</b>
      </div>
    </div>
  );
}

export default ItemNotificacion;
