import React, { useRef, useState } from 'react';
import '../../css/modalVerRegistros.css';
import { useDispatch, useSelector } from 'react-redux';
import { ActiveMenuVerAccesos } from '@renderer/actions/actionsLogin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import SubItemTable from '../subItem/SubItemTable';
import ItemTableHeader from '../items/ItemTableHeader';
import Pagination from '../Pagination';
import { AnimatePresence, motion } from 'framer-motion';
import SubModalViewRegistros from './SubModalViewRegistros';

function ModalViewRegistros(props) {
  const [activeItem, setActiveItem] = useState(false);
  const [direccion, setDireccion] = useState<"siguiente" | "anterior">("siguiente");
  const activeVerAccesos = useSelector((state: any) => state.menuAccions.subMenuVerAccesos);
  const dispatch = useDispatch();
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 7;
  const totalPaginas = Math.ceil(activeVerAccesos.accesos.registros?.length / registrosPorPagina);
  const indiceInicio = (paginaActual - 1) * registrosPorPagina;
  const indiceFin = indiceInicio + registrosPorPagina;
  const registrosPaginados = activeVerAccesos.accesos.registros?.slice(indiceInicio, indiceFin);
  const [clickRegistro, setClickRegistro] = useState<{
    fecha: string
    nombre_dispositivo: string
  }>({
    fecha: '',
    nombre_dispositivo: ''
  });
  const [activeSubModal, setActiveSubModal] = useState<boolean>(false);

  const variants = {
    enter: (dir: "siguiente" | "anterior") => ({
      x: dir === "siguiente" ? 100 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: "siguiente" | "anterior") => ({
      x: dir === "siguiente" ? -50 : 100,
      opacity: 0
    })
  };

  const handleAnterior = () => {
    if (paginaActual > 1) setPaginaActual(prev => prev - 1);
    setDireccion("anterior");
  };

  const handleSiguiente = () => {
    if (paginaActual < totalPaginas) setPaginaActual(prev => prev + 1);
    setDireccion("siguiente");
  };

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      dispatch(ActiveMenuVerAccesos({ user: {}, subMenuVerAccesos: false, accesos: [] }));
    }
  };

  return (
    <div className={activeVerAccesos.subMenuVerAccesos ? 'App__init__contTable__tablaMarcaciones__modalRegistros__active' :
      'App__init__contTable__tablaMarcaciones__modalRegistros'} ref={modalRef} onClick={handleClickOutside} >
      <div className={activeVerAccesos.subMenuVerAccesos ? 'App__init__contTable__tablaMarcaciones__modalRegistros__active__contDatos'
        : 'App__init__contTable__tablaMarcaciones__modalRegistros__contDatos'}>
        <div className='App__init__contTable__tablaMarcaciones__modalRegistros__contDatos__header'>
          <h2>Registros de: <b>{activeVerAccesos.user.nombres} {activeVerAccesos.user.apellidos}</b></h2>
          <span>Marcaciones: <b>{activeVerAccesos.accesos.registros?.length}</b></span>
        </div>
        <AnimatePresence mode="wait" custom={direccion}>
          <motion.div
            key={paginaActual}
            custom={direccion}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className='App__init__contTable__tablaMarcaciones__modalRegistros__contDatos__body'
          >
            {
              registrosPaginados?.map((registro, i) => (
                <SubItemTable key={i} activeItem={activeItem} registro={registro} obtenerFecha={setClickRegistro} activeModal={setActiveSubModal} />
              ))
            }
          </motion.div>
        </AnimatePresence>
        <Pagination paginaActual={paginaActual} totalPaginas={totalPaginas} handleAnterior={handleAnterior} handleSiguiente={handleSiguiente} />
      </div>
      <SubModalViewRegistros registros={activeVerAccesos.accesos.registros?.filter((r) => r.fecha === clickRegistro.fecha
        && r.nombre_dispositivo === clickRegistro.nombre_dispositivo)}
        setActiveModal={setActiveSubModal}
        activeModal={activeSubModal} />
    </div>
  );
}

export default ModalViewRegistros;