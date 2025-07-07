import { faEllipsisVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActiveSubMenuDeleteUsers, ActiveSubMenuPuntoVenta } from '@renderer/actions/actionsLogin';
import { extraerHora } from '@renderer/scripts/extraerHora';
import { useDispatch } from 'react-redux';

function SubItemHorario({ item }) {
  const dispatch = useDispatch();

  return (
    <div className='App__init__tablaMarcaciones__body__item__contRegistros__active__marcaciones__horario__contItem'>
      <span className='App__init__tablaMarcaciones__body__item__contRegistros__active__marcaciones__horario__contItem__dia'>Dia: {item.dia_semana}</span>
      <span className='App__init__tablaMarcaciones__body__item__contRegistros__active__marcaciones__horario__contItem__entrada'>Entrada: {extraerHora(item.hora_entrada)}</span>
      <span className='App__init__tablaMarcaciones__body__item__contRegistros__active__marcaciones__horario__contItem__salida'>Salida: {extraerHora(item.hora_salida)}</span>
      <span className='App__init__tablaMarcaciones__body__item__contRegistros__active__marcaciones__horario__contItem__options'>
        <FontAwesomeIcon  icon={faTrash} onClick={() => {
          dispatch(ActiveSubMenuDeleteUsers({
          user: item,
          activeDeleteUsers: true,
          typeRemove: 'Horario'
        }));
        }} title='Eliminar' />
      </span>
    </div>
  );
}

export default SubItemHorario;