import React, { useState } from 'react';
import '../../css/itemMarcacionDirecto.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

function ItemMarcacionDirecto({ item }) {
  const [activeMarcacioDirecto, setMarcacionDirecto] = useState<boolean>(false);
  return (
    <div className='App__init__marcacionesEnDirecto__body__item'>
      <h5>Fecha: {item.fecha}</h5>
      <h5>Punto de venta: ({item.nombre_dispositivo})</h5>
      <h5>Empleado: ({item.nombre_empleado})</h5>
      {/* <FontAwesomeIcon icon={activeMarcacioDirecto ? faChevronUp : faChevronDown} onClick={() => setMarcacionDirecto(!activeMarcacioDirecto)} /> */}
      <div className='App__init__marcacionesEnDirecto__body__item__subMenu'>
        <h5>Hora: ({item.hora})</h5>
        {/* <h5>Tipo: ({item.registros[0].tipo})</h5> */}
      </div>
    </div>
  );
}

export default ItemMarcacionDirecto;