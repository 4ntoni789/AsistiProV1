import React, { useRef } from 'react'
import '../../css/subModalVerRegistros.css';
import ItemRegistro from '../subItem/SubItemRegistro';
import HeaderItemRegistro from '../HeaderItemRegistro';
import { WorkScheduleBar } from '../WorkScheduleBar';

function SubModalViewRegistros({ registros, setActiveModal, activeModal }) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      setActiveModal(false)
    }
  };

  return (
    <div ref={modalRef} className={activeModal ? 'App__init__contTable__tablaMarcaciones__modalRegistros__active__subModal__active'
      : 'App__init__contTable__tablaMarcaciones__modalRegistros__active__subModal'} onClick={handleClickOutside}>
      <div className={activeModal ? 'App__init__contTable__tablaMarcaciones__modalRegistros__active__subModal__active__contDatos'
        : 'App__init__contTable__tablaMarcaciones__modalRegistros__active__subModal__contDatos'}>
        <div className='App__init__contTable__tablaMarcaciones__modalRegistros__active__subModal__contDatos__header'>
          <h2><b>{registros != undefined ? registros[0]?.dia_semana : 'Cargando....'}</b> </h2>
          <span><b>{registros != undefined ? registros[0]?.fecha : 'Cargando....'}</b></span>
        </div>
        <div className='App__init__contTable__tablaMarcaciones__modalRegistros__active__subModal__body'>
          <HeaderItemRegistro />
          {
            registros != undefined ? registros[0]?.registros.length < 1 ? <span>No hay Registros</span> : registros[0]?.registros.map((i, index) => (
              <ItemRegistro registro={i} pVenta={registros != undefined ? registros[0]?.nombre_dispositivo : null} />
            )) : 'Cargando...'
          }

        </div>
        
        <div className='App__init__contTable__tablaMarcaciones__modalRegistros__active__subModal__contDatos__footer'>
          <span><b>Total de marcaciones: {registros != undefined ? registros[0].registros.length : 0}</b></span>
          <WorkScheduleBar />
          <span><b>Horario:</b></span>
          <WorkScheduleBar />

        </div>
      </div>

    </div>
  )
}

export default SubModalViewRegistros;