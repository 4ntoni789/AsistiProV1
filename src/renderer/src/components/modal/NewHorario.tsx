import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormNewHorario from '../FormNewHorario';
import { ActiveSubMenuPuntoVenta } from '@renderer/actions/actionsPuntoDeVenta';
import { obtenerDatos } from '@renderer/scripts/obtenerDatosFetch';
import { Fetch_cargos } from '@renderer/actions/actionsCargos';
import { AppDispatch } from '@renderer/store';
import '../../css/newHorario.css';

function NewHorario({ activeSubModal }: { activeSubModal: boolean }) {
  const activeMenuPuntoVenta = useSelector((state: any) => state.menuAccions.subMenuPuntoVenta);
  const [userCargo, setUserCargo] = useState<[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);

  useEffect(() => {
    obtenerDatos(dispatch(Fetch_cargos(userId)), setUserCargo);
  }, [activeMenuPuntoVenta.subMenuPuntoVenta == true]);

  return (
    <>
      <div className={!activeSubModal && activeMenuPuntoVenta.subMenuPuntoVenta ?
        'App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__active'
        : 'App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario'}>
        <div className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__btnClose'>
          <FontAwesomeIcon tabIndex={activeMenuPuntoVenta.subMenuPuntoVenta ? 1 : -1} icon={faXmark} onClick={() => dispatch((ActiveSubMenuPuntoVenta({ user: {}, subMenuPuntoVenta: false })))} />
        </div>
        <FormNewHorario userCargo={userCargo} />
      </div >
    </>
  );
}

export default NewHorario;