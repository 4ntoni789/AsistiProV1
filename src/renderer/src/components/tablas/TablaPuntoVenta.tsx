import { faArrowsRotate, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ItemTableHeader from '../items/ItemTableHeader';
import ItemTable from '../items/ItemTable';
import '../../css/tablaPuntoVenta.css';
import ItemTablePuntoVenta from '../items/ItemTablePuntoVenta';
import SubMenuPuntoVenta from '../modal/SubMenuPuntoVenta';
import { obtenerDatos } from '@renderer/scripts/obtenerDatosFetch';
import { AppDispatch } from '@renderer/store';
import { Fetch_Punto_venta } from '@renderer/actions/actionsPuntoDeVenta';

function TablaPuntoVenta(props) {
  const spam = useSelector((state: any) => state.menuAccions.errorSpam);
  const [userContrato, setUserContrato] = useState<any>();
  const userData = useSelector((state: any) => state.loginAccess.validationAccess);
  const activeNewEmpleado = useSelector((state: any) => state.menuAccions.subMenuNewEmpleado.activeNewEmpleado);
  const activeDeleteUsers = useSelector((state: any) => state.menuAccions.deleteUser.activeDeleteUsers);
  const [clickLoad, setClickLoad] = useState<boolean>(false);
  const [puntosVenta, setPuntosVenta] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);
  const itemsPerPage = 7;
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    obtenerDatos(null, dispatch(Fetch_Punto_venta(userId)), setPuntosVenta);

    if (clickLoad) {
      const interval = setTimeout(() => {
        setClickLoad(false);
      }, 1000);
      () => clearInterval(interval);
    }
  }, [userData == true, clickLoad == true, activeNewEmpleado, activeDeleteUsers, spam]);

  const filteredAccesos = puntosVenta.filter((item) =>
    (item.nombre || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.direccion || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.id_pv || '').toString().includes(searchTerm)
    // (item.registros || []).some(reg =>
    //   (reg.nombre_dispositivo || '').toLowerCase().includes(searchTerm.toLowerCase())
    // )
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

  return (
    <div className='App__init__contTable__tablaPuntoVenta'>
      <h2>Puntos de ventas registrados</h2>
      <div className='App__init__contTable__tablaPuntoVenta__header'>
        <input
          type='search'
          placeholder='Buscar por nombre o id del punto de venta'
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className='App__init__contTable__tablaPuntoVenta__header__contBtn'>
          <FontAwesomeIcon className={clickLoad ? 'App__init__contTable__tablaPuntoVenta__header__contBtn__btnLoad__active' :
            'App__init__contTable__tablaPuntoVenta__header__contBtn__btnLoad'} icon={faArrowsRotate} onClick={() => setClickLoad(true)} />
        </div>
      </div>
      <div className='App__init__contTable__tablaPuntoVenta__body'>
        {/* <ItemTableHeader /> */}
        {currentItems.map((item, index) => (
          <ItemTablePuntoVenta item={item} clickLoad={clickLoad} key={index} />
        ))}
        <div className='App__init__contTable__tablaPuntoVenta__body__pagination'>
          <button
            onClick={() => {
              setClickLoad(true);
              setCurrentPage((prev) => prev - 1);
            }}
            disabled={currentPage === 1}
          >
            Anterior
          </button>

          <span>
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={() => {
              setClickLoad(true);
              setCurrentPage((prev) => prev + 1);
            }}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      </div>
      <SubMenuPuntoVenta />
    </div>
  );
}

export default TablaPuntoVenta;