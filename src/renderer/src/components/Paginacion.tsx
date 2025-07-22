import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

function Paginacion({ setClickLoad, setCurrentPage, currentPage, totalPages }) {
  return (
    <div className='App__init__contTable__tablaMarcaciones__pagination'>
      <button
        onClick={() => {
          setClickLoad(true);
          setCurrentPage((prev) => prev - 1);
        }}
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <span>
        {currentPage} de {totalPages}
      </span>

      <button
        onClick={() => {
          setClickLoad(true);
          setCurrentPage((prev) => prev + 1);
        }}
        disabled={currentPage === totalPages}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  )
}

export default Paginacion
