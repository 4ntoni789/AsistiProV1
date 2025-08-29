import ButtonStyle from '@renderer/components/ButtonStyle';
import { useDispatch, useSelector } from 'react-redux';
import '../css/puntoVenta.css';
import NewPuntoVenta from '@renderer/components/modal/NewPuntoVenta';
import UpdatePuntoVenta from '@renderer/components/modal/UpdatePuntoVenta';
import { ActiveSubMenuNewPuntoVenta, Fetch_Punto_venta } from '@renderer/actions/actionsPuntoDeVenta';
import Buscandor from '@renderer/components/Buscandor';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AppDispatch } from '@renderer/store';
import { useEffect, useState } from 'react';
import { obtenerDatos } from '@renderer/scripts/obtenerDatosFetch';
import Pagination from '@renderer/components/Pagination';
import { UserDataType } from '@renderer/typesTS';
import TablaDePuntoVenta from '@renderer/components/tablas/TablaDePuntoVenta';
import SubMenuPuntoVenta from '@renderer/components/modal/SubMenuPuntoVenta';

function PuntoVenta() {
  const type_role = useSelector((state: any) => state.loginAccess.userLogin.type_role);
  const userData = useSelector((state: UserDataType) => state.loginAccess.validationAccess);
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);
  const spam = useSelector((state: any) => state.menuAccions.errorSpam);
  const [userPuntoVenta, setUserPuntoVenta] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPerPage = window.innerWidth <= 1366 ? 6 : 10;

  const [direccion, setDireccion] = useState<'siguiente' | 'anterior' | 'busqueda'>('busqueda');

  const filteredAccesos = userPuntoVenta?.filter((item) =>
    (item.nombre || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.numero_serie_dispositivo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.id_pv || '').toString().includes(searchTerm)
  );


  const totalPages = Math.ceil(filteredAccesos.length / itemsPerPage);

  const indexOfLastItem = paginaActual * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAccesos.slice(indexOfFirstItem, indexOfLastItem);

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
    obtenerDatos(null, dispatch(Fetch_Punto_venta(userId)), setUserPuntoVenta);
  }, [userData == true, spam.active]);

  return (
    <div className='App__dashboard__contPageOutlet__PageUsers'>
      <div className='App__dashboard__contPageOutlet__PageUsers__contPuntoVenta'>
        <h2 className='App__dashboard__contPageOutlet__PageUsers__contPuntoVenta__title'>Puntos de venta</h2>
        <div className='App__dashboard__contPageOutlet__PageUsers__contPuntoVenta__contBtnNewCargo'>
          <Buscandor searchTerm={searchTerm} handleSearch={handleSearch} />
          <ButtonStyle ico={faPlus} funtion={() => dispatch(ActiveSubMenuNewPuntoVenta({ user: {}, subMenuNewPuntoVenta: true }))} disabled={type_role == 'Administrador' ? false : true} nameBtn='Nuevo punto de venta' />
        </div>
        <TablaDePuntoVenta direccion={direccion} paginaActual={paginaActual} variants={variants} currentItems={currentItems} searchTerm={searchTerm}
          containerVariants={containerVariants} itemVariants={itemVariants} />
        <Pagination paginaActual={paginaActual} totalPaginas={totalPages} handleAnterior={handleAnterior} handleSiguiente={handleSiguiente} />
      </div>
      <NewPuntoVenta />
      <UpdatePuntoVenta />
      <SubMenuPuntoVenta />
    </div>
  );
}

export default PuntoVenta;