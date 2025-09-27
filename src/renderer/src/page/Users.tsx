import { useEffect, useState } from 'react';
import '../css/users.css';
import NewUser from '@renderer/components/modal/NewUser';
import { useDispatch, useSelector } from 'react-redux';
import UpdateUser from '@renderer/components/modal/UpdateUser';
import { ActiveSubMenuNewUsers, Fetch_user } from '@renderer/actions/actionsUsers';
import { AppDispatch } from '@renderer/store';
import { UserDataType } from '@renderer/typesTS';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { obtenerDatos } from '@renderer/scripts/obtenerDatosFetch';
import Buscandor from '@renderer/components/Buscandor';
import Pagination from '@renderer/components/Pagination';
import TablaDeUsuarios from '@renderer/components/tablas/TablaDeUsuarios';

function Users() {
  const [dataUsers, setDataUsers] = useState<any>([]);
  const spam = useSelector((state: any) => state.menuAccions.errorSpam);
  const userData = useSelector((state: UserDataType) => state.loginAccess);
  // const activeNewUsers = useSelector((state: any) => state.menuAccions);
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);
  const dispatch = useDispatch<AppDispatch>();

  const [searchTerm, setSearchTerm] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPerPage = window.innerWidth <= 1366 ? 3 : 3;

  const [direccion, setDireccion] = useState<'siguiente' | 'anterior' | 'busqueda'>('busqueda');

  const filteredAccesos = dataUsers?.filter((item) =>
    (item.nombre_usuario || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.correo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.type_role || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.id_usuario || '').toString().includes(searchTerm)
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
    obtenerDatos(null, dispatch(Fetch_user(userId)), setDataUsers);
  }, [userData.validationAccess, spam.active]);

  return (
    <div className='App__dashboard__contPageOutlet__PageUsers'>
      <div className='App__dashboard__contPageOutlet__PageUsers__contUsers'>
        <h2>Usuarios</h2>
        <div className='App__dashboard__contPageOutlet__PageUsers__contUsers__contBtnNewUser'>
          <Buscandor searchTerm={searchTerm} handleSearch={handleSearch} />
          <button disabled={userData.userLogin.type_role == 'Administrador' ? false : true} onClick={() => dispatch(ActiveSubMenuNewUsers({
            subMenuNewUsers: true
          }))} title='Nuevo usuario' tabIndex={2}>
            Nuevo usuario
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <TablaDeUsuarios direccion={direccion} paginaActual={paginaActual} variants={variants} currentItems={currentItems} searchTerm={searchTerm}
          containerVariants={containerVariants} itemVariants={itemVariants} />
        <Pagination paginaActual={paginaActual} totalPaginas={totalPages} handleAnterior={handleAnterior} handleSiguiente={handleSiguiente} />
      </div>
      <NewUser />
      <UpdateUser />
    </div>
  );
}

export default Users;
