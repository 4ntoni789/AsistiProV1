import React, { useState } from 'react';
import '../../css/modalVerRegistros.css';
import { useDispatch, useSelector } from 'react-redux';
import { ActiveMenuVerAccesos } from '@renderer/actions/actionsLogin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import SubItemTable from '../subItem/SubItemTable';

function ModalViewRegistros(props) {
  const [activeItem, setActiveItem] = useState(false);
  const activeVerAccesos = useSelector((state: any) => state.menuAccions.subMenuVerAccesos);
  const dispatch = useDispatch();
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 7;
  const totalPaginas = Math.ceil(activeVerAccesos.accesos.registros?.length / registrosPorPagina);
  const indiceInicio = (paginaActual - 1) * registrosPorPagina;
  const indiceFin = indiceInicio + registrosPorPagina;
  const registrosPaginados = activeVerAccesos.accesos.registros?.slice(indiceInicio, indiceFin);

  console.log(registrosPaginados)

  const handleAnterior = () => {
    if (paginaActual > 1) setPaginaActual(prev => prev - 1);
  };

  const handleSiguiente = () => {
    if (paginaActual < totalPaginas) setPaginaActual(prev => prev + 1);
  };


  return (
    <div className={activeVerAccesos.subMenuVerAccesos ? 'App__init__contTable__tablaMarcaciones__modalRegistros__active' :
      'App__init__contTable__tablaMarcaciones__modalRegistros'} 
      // onClick={() => dispatch(ActiveMenuVerAccesos({ user: {}, subMenuVerAccesos: false, accesos: [] }))}
      >
      <div className={activeVerAccesos.subMenuVerAccesos ? 'App__init__contTable__tablaMarcaciones__modalRegistros__active__contDatos'
        : 'App__init__contTable__tablaMarcaciones__modalRegistros__contDatos'}>
        {
          registrosPaginados?.map((registro, i) => (
            <SubItemTable key={i} activeItem={activeItem} registro={registro} />
          ))
        }
        <div className='App__init__tablaMarcaciones__body__item__footer__active'  >
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

    </div>
  );
}

export default ModalViewRegistros;