import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import '../../css/subItemTable.css'

function SubItemTable({ registro, activeItem }) {
  const [activeSubItem, setActiveSubItem] = useState<boolean>(false);

  return (
    <div className={activeItem ? 'App__init__tablaMarcaciones__body__item__contRegistros__active' : 'App__init__tablaMarcaciones__body__item__contRegistros'}>
      <div className='App__init__tablaMarcaciones__body__item__contRegistros__active__cont'>
        <h5>{registro.fecha}</h5>
        <h5>{registro.dia_semana}</h5>
        <h5>{registro.nombre_dispositivo}</h5>
      </div>
      <div className={activeSubItem ? 'App__init__tablaMarcaciones__body__item__contRegistros__active__marcaciones__active' :
        'App__init__tablaMarcaciones__body__item__contRegistros__active__marcaciones'}>
        {
          registro?.registros.map((item, i) => (
            <h6 key={i}>Hora: {item?.hora} (Tipo: {item?.tipo})</h6>
          ))
        }
      </div>
    </div>
  );
}

export default SubItemTable;