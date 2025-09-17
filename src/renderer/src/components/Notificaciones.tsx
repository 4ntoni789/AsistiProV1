import '../css/notificaciones.css'
import { useSelector } from 'react-redux';
import ItemNotificacion from './items/ItemNotificacion';

function Notificaciones() {
  const notificacion = useSelector((state: any) => state.menuAccions.notificacion.tipo);

  return (
    <div className='contNotificaciones'>
      <div className='contNotificaciones__contNotificaciones'>
        {
          notificacion.map((noti, i) => (
            <ItemNotificacion key={i} info={noti} />
          ))
        }
      </div>
    </div>
  )
}

export default Notificaciones
