import React, { useEffect, useRef, useState } from 'react';
import '../../css/itemTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronLeft, faChevronRight, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import SubItemTable from '../subItem/SubItemTable';
import { useDispatch } from 'react-redux';
import { ActiveSubMenuEmpleado } from '@renderer/actions/actionsLogin';

function ItemTable({ item, clickLoad, contrato }) {
  const [activeItem, setActiveItem] = useState(false);
  // const [activeSubMenuEmpleado, setActiveSubMenuEmpleado] = useState(false);
  const dispatch = useDispatch();
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 7;


  useEffect(() => {
    if (!clickLoad) {
      setActiveItem(false);
    }
  }, [clickLoad]);

  const totalPaginas = Math.ceil(item.registros.length / registrosPorPagina);
  const indiceInicio = (paginaActual - 1) * registrosPorPagina;
  const indiceFin = indiceInicio + registrosPorPagina;
  const registrosPaginados = item.registros.slice(indiceInicio, indiceFin);

  const handleAnterior = () => {
    if (paginaActual > 1) setPaginaActual(prev => prev - 1);
  };

  const handleSiguiente = () => {
    if (paginaActual < totalPaginas) setPaginaActual(prev => prev + 1);
  };

  const contFilter = contrato.find((c, i) => {
    if (c.estado == 'Activo') {
      return c
    }
  })


  return (
    <div className='App__init__tablaMarcaciones__body__item'>
      <div className='App__init__tablaMarcaciones__body__item__header'>
        <h4 onClick={() => {
          dispatch(ActiveSubMenuEmpleado({ user: item, subMenuEmpleado: true }));
        }}>{item.nombres} {item.apellidos}</h4>
        <h4>{item.cedula}</h4>
        {
          contFilter ? <>
            <h4>{contFilter.id_contrato}</h4>
            <h4>{contFilter.fecha_inicio.toString().split('T')[0]}</h4>
            {
              contFilter.fecha_fin ? <h4>{contFilter.fecha_fin.toString().split('T')[0]}</h4> : <h4></h4>
            }
          </> : <>
            <h4></h4>
            <h4></h4>
            <h4></h4>
          </>
        }
        {/* <h4>{contrato[0]?.fecha_fin.toString().split('T')[0]}</h4> */}
        <FontAwesomeIcon icon={activeItem ? faChevronUp : faChevronDown} onClick={() => setActiveItem(!activeItem)} title='Mostrar Registros' />
        {/* <h4></h4> */}
      </div>
      {
        activeItem ? registrosPaginados?.map((registro, i) => (
          <SubItemTable key={i} activeItem={activeItem} registro={registro} />
        )) : null
      }
      <div className={activeItem ? 'App__init__tablaMarcaciones__body__item__footer__active' : 'App__init__tablaMarcaciones__body__item__footer'} >
        <button onClick={handleAnterior} disabled={paginaActual === 1}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span>
          Página {paginaActual} de {totalPaginas}
        </span>
        <button onClick={handleSiguiente} disabled={paginaActual === totalPaginas}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}

export default ItemTable;