import { ActiveSubMenuNewCargo, Fetch_cargos } from '@renderer/actions/actionsCargos';
import ButtonStyle from '@renderer/components/ButtonStyle';
import NewCargo from '@renderer/components/modal/NewCargo';
import UpdateCargo from '@renderer/components/modal/UpdateCargo';
import { obtenerDatos } from '@renderer/scripts/obtenerDatosFetch';
import { AppDispatch } from '@renderer/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../css/cargos.css';
import Buscandor from '@renderer/components/Buscandor';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Pagination from '@renderer/components/Pagination';
import TablaDeCargos from '@renderer/components/tablas/TablaDeCargos';

function Cargos({ }) {
  const userData = useSelector((state: any) => state.loginAccess.validationAccess);
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);
  const spam = useSelector((state: any) => state.menuAccions.errorSpam);
  const [userCargo, setUserCargo] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPerPage = window.innerWidth <= 1366 ? 6 : 10;

  const [direccion, setDireccion] = useState<'siguiente' | 'anterior' | 'busqueda'>('busqueda');

  const filteredAccesos = userCargo?.filter((item) =>
    (item.nombre_cargo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.id_cargo || '').toString().includes(searchTerm)
  );


  const totalPages = Math.ceil(filteredAccesos?.length / itemsPerPage);

  const indexOfLastItem = paginaActual * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAccesos?.slice(indexOfFirstItem, indexOfLastItem);

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
    obtenerDatos(null, dispatch(Fetch_cargos(userId)), setUserCargo);
  }, [userData == true, spam.active]);

  return (
    <div className='App__dashboard__contPageOutlet__PageUsers'>
      <div className='App__dashboard__contPageOutlet__PageUsers__contCargos'>
        <h2>Cargos</h2>
        <div className='App__dashboard__contPageOutlet__PageUsers__contCargos__contBtnNewCargo'>
          <Buscandor searchTerm={searchTerm} handleSearch={handleSearch} />
          <ButtonStyle ico={faPlus} disabled={false} nameBtn='Nuevo cargo' funtion={() => dispatch(ActiveSubMenuNewCargo({ user: {}, subMenuNewCargo: true }))} />
        </div>
        <TablaDeCargos direccion={direccion} paginaActual={paginaActual} variants={variants} currentItems={currentItems} searchTerm={searchTerm}
          containerVariants={containerVariants} itemVariants={itemVariants} />
        <Pagination paginaActual={paginaActual} totalPaginas={totalPages} handleAnterior={handleAnterior} handleSiguiente={handleSiguiente} />
      </div>
      <NewCargo />
      <UpdateCargo />
    </div>
  );
}

export default Cargos;