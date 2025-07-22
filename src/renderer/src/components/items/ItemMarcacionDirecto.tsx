import '../../css/itemMarcacionDirecto.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFingerprint, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { tiempoTranscurrido } from '@renderer/scripts/tiempoTranscurrido';

interface Props {
  item: any;
  isNew?: boolean;
}

function ItemMarcacionDirecto({ item, isNew = false }: Props) {

  return (
    <div className={`App__init__marcacionesEnDirecto__body__item ${isNew ? 'item-enter' : ''}`}>
      <div className='App__init__marcacionesEnDirecto__body__item__ico'>
        <FontAwesomeIcon icon={faFingerprint} title='Marcación'/>
      </div>
      <div className='App__init__marcacionesEnDirecto__body__item__info'>
        <h5><span>Fecha:</span> {item.fecha}  <span><FontAwesomeIcon icon={faStopwatch}/></span> <b>{tiempoTranscurrido(item.fecha, item.hora)}</b></h5>
        <h5><span>Punto de venta:</span> {item.nombre_dispositivo}</h5>
        <h5><span>Empleado:</span> {item.nombre_empleado}</h5>
        <h5><span>Hora:</span> {item.hora}</h5>
      </div>
    </div>
  );
}

export default ItemMarcacionDirecto;