import { faArrowLeft, faClock, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import SubItemHorario from '../subItem/SubItemHorario';
import '../../css/itemHorario.css';

function ItemHorario({ registro, cargos, dataHorario }) {
  const [activeSubItem, setActiveSubItem] = useState<boolean>(false);
  const [dataRHorario, setDataRHorario] = useState<object>({});

  useEffect(() => {
    if (Object.keys(dataRHorario).length > 0) {
      dataHorario(dataRHorario);
    }
  }, [dataRHorario])

  return (
    <div className={'App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__form__horarios__itemHorario'}>
      <div className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__form__horarios__itemHorario__header'>
        <h5>Turno: {registro.turno}</h5>
        <h5>Cargo: {cargos.filter((item) => item.id_cargo == registro.cargo)[0]?.nombre_cargo}</h5>
        <FontAwesomeIcon icon={faClock} onClick={() => setActiveSubItem(!activeSubItem)} title='Ver horarios' />
      </div>
      <div className={activeSubItem ? 'App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__form__horarios__itemHorario__horarios__active' :
        'App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__form__horarios__itemHorario__horarios'}>
        <div className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__form__btnClose'>
          <FontAwesomeIcon icon={faArrowLeft} onClick={() => setActiveSubItem(!activeSubItem)} />
        </div>
        {activeSubItem
          ?
          registro.horarios.map((item, i) => (
            <SubItemHorario restHorario={() => setDataRHorario(item)} rHorario={dataHorario} key={i} item={item} />
          ))
        : 'Cargando...'}
      </div>
    </div>
  );
}

export default ItemHorario;