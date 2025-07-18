import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import '../css/pagination.css';

function Pagination({ paginaActual, totalPaginas, handleAnterior, handleSiguiente }) {
  return (
    <div className='App__init__contTable__tablaMarcaciones__modalRegistros__contDatos__pagination'  >
      <button onClick={handleAnterior} disabled={paginaActual === 1}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <span>
        {paginaActual} de {totalPaginas}
      </span>
      <button onClick={handleSiguiente} disabled={paginaActual === totalPaginas}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  )
}

export default Pagination;