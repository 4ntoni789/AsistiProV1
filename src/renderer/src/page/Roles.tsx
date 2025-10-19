import { ActiveSubMenuNewRole, Fetch_roles } from '@renderer/actions/actionsRoles';
import ButtonStyle from '@renderer/components/ButtonStyle';
import NewRole from '@renderer/components/modal/NewRole';
import UpdateRole from '@renderer/components/modal/UpdateRole';
import { obtenerDatos } from '@renderer/scripts/obtenerDatosFetch';
import { AppDispatch } from '@renderer/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../css/roles.css'
import Buscandor from '@renderer/components/Buscandor';
import Pagination from '@renderer/components/Pagination';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TablaDeRoles from '@renderer/components/tablas/TablaDeRoles';

function Roles({ }) {
  const userData = useSelector((state: any) => state.loginAccess.validationAccess);
  const spam = useSelector((state: any) => state.menuAccions.errorSpam);
  const [userRoles, setUserRoles] = useState<any>([]);
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPerPage = window.innerWidth <= 1366 ? 4 : 8;

  const [direccion, setDireccion] = useState<'siguiente' | 'anterior' | 'busqueda'>('busqueda');

  const filteredAccesos = userRoles?.filter((item) =>
    (item.nombre_rol || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.id_rol || '').toString().includes(searchTerm)
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
    obtenerDatos(dispatch(Fetch_roles(userId)), setUserRoles);
  }, [userData == true, spam.active]);

  return (
    <div className='App__dashboard__contPageOutlet__PageUsers'>
      <div className='App__dashboard__contPageOutlet__PageUsers__contRoles'>
        <h2>Roles</h2>
        <div className='App__dashboard__contPageOutlet__PageUsers__contRoles__contBtnNewRole'>
          <Buscandor searchTerm={searchTerm} handleSearch={handleSearch} />
          <ButtonStyle ico={faPlus} disabled={false} nameBtn='Nuevo rol' funtion={() => dispatch(ActiveSubMenuNewRole({ user: {}, subMenuNewRole: true }))} />
        </div>
        <TablaDeRoles direccion={direccion} paginaActual={paginaActual} variants={variants} currentItems={currentItems} searchTerm={searchTerm}
          containerVariants={containerVariants} itemVariants={itemVariants} />
        <Pagination paginaActual={paginaActual} totalPaginas={totalPages} handleAnterior={handleAnterior} handleSiguiente={handleSiguiente} />
      </div>
      <NewRole />
      <UpdateRole />
    </div>
  );
}

export default Roles;