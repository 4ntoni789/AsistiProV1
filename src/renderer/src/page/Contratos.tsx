import { useEffect, useRef, useState } from 'react';
import '../css/contratos.css';
import { obtenerDatos } from '@renderer/scripts/obtenerDatosFetch';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@renderer/store';
import { UserDataType } from '@renderer/typesTS';
import { Fetch_contratos } from '@renderer/actions/actionsContratos';
import Buscandor from '@renderer/components/Buscandor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faFileCircleExclamation, faFileCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Pagination from '@renderer/components/Pagination';
import TablaDeContratos from '@renderer/components/tablas/TablaDeContratos';
import ContratosPorVencer from '@renderer/components/ContratosPorVencer';
import ModalViewContrato from '@renderer/components/modal/ModalViewContrato';
import { procesarStateSearchOptions } from '@renderer/scripts/procesarStateSearchOptions';

function Contratos() {
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: UserDataType) => state.loginAccess.validationAccess);
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);
  const [userContrato, setUserContrato] = useState<any>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [direccion, setDireccion] = useState<'siguiente' | 'anterior' | 'busqueda'>('busqueda');
  const itemsPerPage = window.innerWidth <= 1366 ? 6 : 10;
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLSpanElement | null>(null);
  const [stateSearchOptions, setStateSearchOptions] = useState<'contratro_inactivo' | 'contratro_vencidos' | ''>('');
  const spam = useSelector((state: any) => state.menuAccions.errorSpam);



  const filteredAccesos = userContrato?.filter((item) =>
    (item.nombres || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.nombre_cargo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.id_contrato || '').toString().includes(searchTerm) ||
    (item.id_empleado || '').toString().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredAccesos.filter((item) => procesarStateSearchOptions(stateSearchOptions) ?
    item.estado === procesarStateSearchOptions(stateSearchOptions) : item.estado === procesarStateSearchOptions(stateSearchOptions))?.length / itemsPerPage);

  const indexOfLastItem = paginaActual * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAccesos?.filter((item) => procesarStateSearchOptions(stateSearchOptions) ?
    item.estado === procesarStateSearchOptions(stateSearchOptions) : item.estado === procesarStateSearchOptions(stateSearchOptions)).slice(indexOfFirstItem, indexOfLastItem);

  const variants = {
    enter: (dir: 'siguiente' | 'anterior') => ({
      x: dir === 'siguiente' ? 20 : -20,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: 'siguiente' | 'anterior') => ({
      x: dir === 'siguiente' ? -20 : 20,
      opacity: 0
    })
  };

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0 },
  };

  const handleAnterior = () => {
    if (paginaActual > 1) setPaginaActual(prev => prev - 1);
    setDireccion('anterior');
  };

  const handleSiguiente = () => {
    if (paginaActual < totalPages) setPaginaActual(prev => prev + 1);
    setDireccion('siguiente');
  };


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setDireccion('busqueda');
    setPaginaActual(1);
  };

  useEffect(() => {
    obtenerDatos(null, dispatch(Fetch_contratos(userId)), setUserContrato);
  }, [userData == true, spam]);


  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;

      if (buttonRef.current && !buttonRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen]);

  return (
    <div className='App__dashboard__contPageOutlet__PageUsers'>
      <div className='App__dashboard__contPageOutlet__PageUsers__contContratos'>
        <h2 className='App__dashboard__contPageOutlet__PageUsers__contContratos__title'>Contratos</h2>
        <div className='App__dashboard__contPageOutlet__PageUsers__contContratos__contBtnNewCargo'>
          <Buscandor searchTerm={searchTerm} handleSearch={handleSearch} />
          <div className='App__dashboard__contPageOutlet__PageUsers__contContratos__contBtnNewCargo__contBtnActions'>
            {
              stateSearchOptions === 'contratro_inactivo' ?
                <span className='App__dashboard__contPageOutlet__PageUsers__contContratos__contBtnNewCargo__contBtnActions__icoActive' onClick={() => setStateSearchOptions('')}>
                  <FontAwesomeIcon title='Contratos inactivos' icon={faFileCircleExclamation} />
                </span> :
                stateSearchOptions === 'contratro_vencidos' ?
                  <span className='App__dashboard__contPageOutlet__PageUsers__contContratos__contBtnNewCargo__contBtnActions__icoActive' onClick={() => setStateSearchOptions('')}>
                    <FontAwesomeIcon title='Contratos inactivos' icon={faFileCircleXmark} />
                  </span> :
                  null}
            <span ref={buttonRef}>
              <FontAwesomeIcon icon={faEllipsisVertical} onClick={() => setIsOpen(!isOpen)} />
            </span>
            {/* <FontAwesomeIcon title='Ver contratos fijos' icon={faFileContract} /> */}
            {/* <FontAwesomeIcon title='Ver contratos indefinidos' icon={faFileCircleCheck} /> */}
          </div>
          <div className={isOpen ? 'App__dashboard__contPageOutlet__PageUsers__contContratos__contBtnNewCargo__options__active' :
            'App__dashboard__contPageOutlet__PageUsers__contContratos__contBtnNewCargo__options'}>
            <span title='Mostrar contratos Inactivos' onClick={() => stateSearchOptions ? setStateSearchOptions('')
              : setStateSearchOptions('contratro_inactivo')}><FontAwesomeIcon icon={faFileCircleExclamation} /> Contratos inactivos</span>
            <span title='Mostrar contratos Vencidos'
              onClick={() => stateSearchOptions ? setStateSearchOptions('') : setStateSearchOptions('contratro_vencidos')}>
              <FontAwesomeIcon icon={faFileCircleXmark} /> Contratos vencidos</span>
          </div>
        </div>
        <TablaDeContratos direccion={direccion} paginaActual={paginaActual} variants={variants} currentItems={currentItems} searchTerm={searchTerm}
          containerVariants={containerVariants} itemVariants={itemVariants} />
        <Pagination paginaActual={paginaActual} totalPaginas={totalPages} handleAnterior={handleAnterior} handleSiguiente={handleSiguiente} />
      </div>
      <ContratosPorVencer />
      <ModalViewContrato />
    </div>
  )
}

export default Contratos
