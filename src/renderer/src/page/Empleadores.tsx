import ButtonStyle from '@renderer/components/ButtonStyle';
import NewEmpleador from '@renderer/components/modal/NewEmpleador';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../css/empleadores.css';
import UpdateEmpleador from '@renderer/components/modal/UpdateEmpleador';
import { ActiveSubMenuNewEmpleador, Fetch_empleadores } from '@renderer/actions/actionsEmpleadores';
import { AppDispatch } from '@renderer/store';
import { obtenerDatos } from '@renderer/scripts/obtenerDatosFetch';
import { UserDataType } from '@renderer/typesTS';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Buscandor from '@renderer/components/Buscandor';
import Pagination from '@renderer/components/Pagination';

import TablaDeEmpleadores from '@renderer/components/tablas/TablaDeEmpleadores';

function Empleadores({ }) {
  const userData = useSelector((state: UserDataType) => state.loginAccess.validationAccess);
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);
  const spam = useSelector((state: any) => state.menuAccions.errorSpam);
  const [empleadores, setEmpleadores] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPerPage = window.innerWidth <= 1366 ? 6 : 8;
  const [direccion, setDireccion] = useState<'siguiente' | 'anterior' | 'busqueda'>('busqueda');

  const filteredAccesos = empleadores?.filter((item) =>
    (item.nombre_empleador || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.nit || '').toString().includes(searchTerm) ||
    (item.id_empleador || '').toString().includes(searchTerm) 
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
    obtenerDatos(null, dispatch(Fetch_empleadores(userId)), setEmpleadores);
  }, [userData == true, spam.active]);

  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<any | null>(null);

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
    <div className='App__dashboard__contPageOutlet__PageUsers'>
      <div className='App__dashboard__contPageOutlet__PageUsers__contEmpleadores'>
        <h2 className='App__dashboard__contPageOutlet__PageUsers__contEmpleadores__title' >Empleadores</h2>
        <div className='App__dashboard__contPageOutlet__PageUsers__contEmpleadores__contBtnEmpleador'>
          <Buscandor searchTerm={searchTerm} handleSearch={handleSearch} />
          <ButtonStyle ico={faPlus} disabled={false} nameBtn='Nuevo empleador' funtion={() => dispatch(ActiveSubMenuNewEmpleador({ user: {}, subMenuNewEmpleador: true }))} />
        </div>
        <TablaDeEmpleadores direccion={direccion} paginaActual={paginaActual} variants={variants} currentItems={currentItems} searchTerm={searchTerm}
          containerVariants={containerVariants} itemVariants={itemVariants} />
        <Pagination paginaActual={paginaActual} totalPaginas={totalPages} handleAnterior={handleAnterior} handleSiguiente={handleSiguiente} />

      </div>
      <NewEmpleador />
      <UpdateEmpleador />
    </div>
  );
}

export default Empleadores;