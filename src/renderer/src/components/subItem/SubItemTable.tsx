import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import '../../css/subItemTable.css'

function SubItemTable({ registro, activeItem, obtenerFecha, activeModal }) {
  const [activeSubItem, setActiveSubItem] = useState<boolean>(false);

  return (
    <div className={registro.nombre_dispositivo == 'No marcado' ? 'App__init__tablaMarcaciones__body__item__contRegistros__noMark' :
      'App__init__tablaMarcaciones__body__item__contRegistros'} onClick={() => {
        obtenerFecha({
          fecha: registro.fecha,
          nombre_dispositivo: registro.nombre_dispositivo
        });
        activeModal(true);
      }}>
      <div className='App__init__tablaMarcaciones__body__item__contRegistros__active__cont'>
        <h5>{registro.fecha}</h5>
        <h5>{registro.dia_semana}</h5>
        <h5>{registro.nombre_dispositivo}</h5>
      </div>
    </div>
  );
}

export default SubItemTable;