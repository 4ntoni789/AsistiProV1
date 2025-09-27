import { faRotate, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActiveSubMenuDeleteUsers } from '@renderer/actions/actionsUsers';
import { extraerHora } from '@renderer/scripts/extraerHora';
import { useDispatch } from 'react-redux';
import '../../css/subItemHorario.css';
import { calcularHorasTrabajadas } from '@renderer/scripts/calcularHorasTrabajadas';
import { formatearHoraHorario } from '@renderer/scripts/formatearHoraHorario';

function SubItemHorario({ item, rHorario, restHorario }) {
  const dispatch = useDispatch();

  return (
    <div className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__form__horarios__itemHorario__horarios__item'>
      <span >Dia: <b>{item.dia_semana}</b> Horas a trabajar:<b> {calcularHorasTrabajadas(formatearHoraHorario(item.hora_entrada), formatearHoraHorario(item.hora_salida), formatearHoraHorario(item.hora_salida_descanso),
        formatearHoraHorario(item.hora_regreso_descanso))}</b></span>
      <span >Entrada: <b>{extraerHora(item.hora_entrada)}</b> Salida: <b>{extraerHora(item.hora_salida)}</b></span>

      {item.hora_salida_descanso ? <span >Descanso: <b>{extraerHora(item.hora_salida_descanso)}</b> Regreso descanso: <b>{extraerHora(item.hora_regreso_descanso)}</b></span>
        :
        <span className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__form__horarios__itemHorario__horarios__item__spanSinDescanso'><b>Sin Descanso</b></span>}

      <span >Entrada valida: <b>{extraerHora(item.hora_valida_entrada)} / {extraerHora(item.hora_valida_entrada_hasta)}</b></span>
      {item.hora_salida_descanso ?
        <span >Descanso valido: <b>{extraerHora(item.hora_valida_salida_descanso)} / {extraerHora(item.hora_valida_salida_descanso_hasta)}</b>
          - <b>{extraerHora(item.hora_valida_regreso_descanso)} / {extraerHora(item.hora_valida_regreso_descanso_hasta)}</b></span>
        :null}
      <span >Salida valida: <b>{extraerHora(item.hora_valida_salida)} / {extraerHora(item.hora_valida_salida_hasta)}</b></span>
      <span>
        {
          rHorario === null ?
            <FontAwesomeIcon icon={faTrash} onClick={() => {
              dispatch(ActiveSubMenuDeleteUsers({
                user: item,
                activeDeleteUsers: true,
                typeRemove: 'Horario'
              }));
            }} title='Eliminar' /> : <FontAwesomeIcon icon={faRotate} title='Reutilizar' onClick={restHorario} />
        }
      </span>
    </div>
  );
}

export default SubItemHorario;