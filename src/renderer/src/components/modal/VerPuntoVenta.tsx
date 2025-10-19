import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ItemHorario from '../items/ItemHorario';
import { ActiveSubMenuPuntoVenta } from '@renderer/actions/actionsPuntoDeVenta';
import { obtenerDatos } from '@renderer/scripts/obtenerDatosFetch';
import { AppDispatch } from '@renderer/store';
import { Fetch_cargos } from '@renderer/actions/actionsCargos';
import { Fetch_horario } from '@renderer/actions/actionsHorario';
import { convertirEnPunto } from '@renderer/scripts/convertirCaracterPunto';


function VerPuntoVenta({ activeSubModal }: { activeSubModal: boolean }) {
  const activeMenuPuntoVenta = useSelector((state: any) => state.menuAccions.subMenuPuntoVenta);
  const activeModalDelete = useSelector((state: any) => state.menuAccions.deleteUser);
  // const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const [horario, setHorario] = useState<any>({});
  // const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);
  const [userCargo, setUserCargo] = useState<[]>([]);

  useEffect(() => {
    obtenerDatos(dispatch(Fetch_horario(userId, activeMenuPuntoVenta)), setHorario);
    obtenerDatos(dispatch(Fetch_cargos(userId)), setUserCargo);

  }, [activeMenuPuntoVenta.subMenuPuntoVenta == true, activeModalDelete]);

  return (
    <>
      <form className={activeSubModal && activeMenuPuntoVenta.subMenuPuntoVenta ? 'App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__form__active'
        : 'App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__form'}>
        <div className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__form__btnClose'>
          <FontAwesomeIcon icon={faXmark} onClick={() => dispatch((ActiveSubMenuPuntoVenta({ user: {}, subMenuPuntoVenta: false })))} />
        </div>
        <div className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__form__dataUser'>
          <h2>Información del punto de venta</h2>
          <br />
          <span>Nombre: <b>{activeMenuPuntoVenta.user.item?.nombre == undefined ? 'Cargando...' : activeMenuPuntoVenta.user.item?.nombre}</b></span>
          <span>Id del punto de venta: <b>{activeMenuPuntoVenta.user.item?.id_pv == undefined ? 'Cargando...' : activeMenuPuntoVenta.user.item?.id_pv}</b></span>
          <span>Dirección: <b>{activeMenuPuntoVenta.user.item?.direccion == undefined ? 'Cargando...' : activeMenuPuntoVenta.user.item?.direccion}</b></span>
          <span>Dispositivo: <b title={activeMenuPuntoVenta.user.item?.numero_serie_dispositivo == undefined ? 'Cargando...' : activeMenuPuntoVenta.user.item?.numero_serie_dispositivo}>
            {convertirEnPunto(activeMenuPuntoVenta.user.item?.numero_serie_dispositivo)}</b></span>
        </div>
        <div className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__form__horarios'>
          {
            horario?.length > 0 ? <>
              <h2>Horarios de este punto de venta</h2>
              {
                horario?.map((item: any, i: number) => (
                  <ItemHorario dataHorario={null} cargos={userCargo} key={i} registro={item} />
                ))
              }
            </> : <span>No hay horarios para este punto</span>
          }
        </div>
      </form>
    </>
  );
}

export default VerPuntoVenta;