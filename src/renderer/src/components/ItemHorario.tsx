import { faChevronDown, faChevronUp, faEllipsis, faEllipsisVertical, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActiveSubMenuDeleteUsers } from '@renderer/actions/actionsLogin';
import { extraerHora } from '@renderer/scripts/extraerHora';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import SubItemHorario from './subItem/SubItemHorario';

function ItemHorario({ registro, cargos }) {
  const [activeSubItem, setActiveSubItem] = useState<boolean>(false);

  return (
    <div className={'App__init__tablaMarcaciones__body__item__contRegistros__active'}>
      <div className='App__init__tablaMarcaciones__body__item__contRegistros__active__cont'>
        <h5>Turno: {registro.turno}</h5>
        <h5>Cargo: {cargos.filter((item)=>item.id_cargo == registro.cargo)[0]?.nombre_cargo}</h5>
        <FontAwesomeIcon icon={activeSubItem ? faChevronUp : faChevronDown} onClick={() => setActiveSubItem(!activeSubItem)} title='Ver horarios' />
      </div>
      <div className={activeSubItem ? 'App__init__tablaMarcaciones__body__item__contRegistros__active__marcaciones__horario__active' :
        'App__init__tablaMarcaciones__body__item__contRegistros__active__marcaciones__horario'}>
        {
          registro.horarios.map((item, i) => (
            <SubItemHorario key={i} item={item} />
          ))
        }
      </div>
    </div>
  );
}

export default ItemHorario;