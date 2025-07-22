import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../css/tablaDeMarcaciones.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faCalendar, faCalendarXmark, faChevronLeft, faChevronRight, faEllipsisVertical, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import ItemTable from '../items/ItemTable';

import ItemTableHeader from '../items/ItemTableHeader';
import MenuEmpleado from '../modal/SubMenuEmpleado';
import { } from '@renderer/actions/actionsLogin';
import ModalViewRegistros from '../modal/ModalViewRegistros';
import { ActiveSubMenuNewEmpleado, Fetch_empleados } from '@renderer/actions/actionsEmpleados';
import { obtenerDatos } from '@renderer/scripts/obtenerDatosFetch';
import { Fetch_contratos } from '@renderer/actions/actionsContratos';
import { AppDispatch } from '@renderer/store';
import Buscandor from '../Buscandor';
import Paginacion from '../Paginacion';

function TablaMarcaciones() {
  const spam = useSelector((state: any) => state.menuAccions.errorSpam);
  const [userContrato, setUserContrato] = useState<any>();
  const userData = useSelector((state: any) => state.loginAccess.validationAccess);
  const activeNewEmpleado = useSelector((state: any) => state.menuAccions.subMenuNewEmpleado.activeNewEmpleado);
  const activeDeleteUsers = useSelector((state: any) => state.menuAccions.deleteUser.activeDeleteUsers);
  const [clickLoad, setClickLoad] = useState<boolean>(false);
  const [accesos, setAccesos] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);
  const dispatch = useDispatch<AppDispatch>();
  // const [activeOptions, setActiveOptions] = useState<boolean>(false);

  useEffect(() => {
    obtenerDatos(null, dispatch(Fetch_contratos(userId)), setUserContrato);
    obtenerDatos(null, dispatch(Fetch_empleados(userId)), setAccesos);
  
    if (clickLoad) {
      const interval = setTimeout(() => {
        setClickLoad(false);
      }, 1000);
      () => clearInterval(interval);
    }
  }, [userData == true, clickLoad == true, activeNewEmpleado, activeDeleteUsers, spam]);

  const filteredAccesos = accesos.filter((item) =>
    (item.nombres || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.apellidos || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.cedula || '').toString().includes(searchTerm) ||
    (item.registros || []).some(reg =>
      (reg.nombre_dispositivo || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredAccesos.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAccesos.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setClickLoad(true);
    setCurrentPage(1);
  };

  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLSpanElement | null>(null);

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
  }, [isOpen]);;


  return (
    <div className='App__init__contTable__tablaMarcaciones'>
      <h2>Empleados y marcaciones</h2>
      <div className='App__init__contTable__tablaMarcaciones__header'>
        <Buscandor searchTerm={searchTerm} handleSearch={handleSearch}/>
        <div className='App__init__contTable__tablaMarcaciones__header__contBtn'>
          <span title='Nuevo empleado' onClick={() => dispatch(ActiveSubMenuNewEmpleado({ user: {}, activeNewEmpleado: true }))}>
            <FontAwesomeIcon icon={faPlus} />
          </span>
          <span>
            <FontAwesomeIcon className={clickLoad ? 'App__init__contTable__tablaMarcaciones__header__contBtn__btnLoad__active' :
              'App__init__contTable__tablaMarcaciones__header__contBtn__btnLoad'} icon={faArrowsRotate} onClick={() => setClickLoad(true)} />
          </span>
          <span ref={buttonRef}>
            <FontAwesomeIcon icon={faEllipsisVertical} onClick={() => setIsOpen(!isOpen)} />
          </span>

          <div className={isOpen ? 'App__init__contTable__tablaMarcaciones__header__contBtn__contOptions__active' :
            'App__init__contTable__tablaMarcaciones__header__contBtn__contOptions'}>
            <span><FontAwesomeIcon icon={faCalendar} /> Fecha de inicio</span>
            <span><FontAwesomeIcon icon={faCalendar} /> Fecha de fin</span>
            <span><FontAwesomeIcon icon={faCalendarXmark} /> Sin contrato</span>
          </div>
        </div>
      </div>
      <div className='App__init__contTable__tablaMarcaciones__body'>
        <ItemTableHeader />
        {currentItems.map((item, index) => (
          <ItemTable clickLoad={clickLoad} key={index} item={item} contrato={userContrato.filter((item2) => (item2.id_empleado == item.id_empleado))} />
        ))}
      </div>
      <Paginacion setClickLoad={setClickLoad} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages}/>
      <MenuEmpleado />
      <ModalViewRegistros />
    </div>
  );
}

export default TablaMarcaciones;
