import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ItemHorario from '../ItemHorario';
import { ActiveSubMenuPuntoVenta } from '@renderer/actions/actionsPuntoDeVenta';
import { obtenerDatos } from '@renderer/scripts/obtenerDatosFetch';
import { AppDispatch } from '@renderer/store';
import { Fetch_cargos } from '@renderer/actions/actionsCargos';
import { Fetch_horario } from '@renderer/actions/actionsHorario';

function VerPuntoVenta(props) {
  const activeMenuPuntoVenta = useSelector((state: any) => state.menuAccions.subMenuPuntoVenta);
  const activeModalDelete = useSelector((state: any) => state.menuAccions.deleteUser);
  // const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const [horario, setHorario] = useState<any>({});
  // const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);
  const [userCargo, setUserCargo] = useState<[]>([]);

  useEffect(() => {
    obtenerDatos(null, dispatch(Fetch_horario(userId, activeMenuPuntoVenta)), setHorario);

  }, [activeMenuPuntoVenta.subMenuPuntoVenta == true, activeModalDelete]);

  useEffect(() => {
    obtenerDatos(null, dispatch(Fetch_cargos(userId)), setUserCargo);
  }, [activeMenuPuntoVenta.subMenuPuntoVenta == true]);


  return (
    <>
      <form className='App__dashboard__contPageOutlet__PageUsers__newUser__form'>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__close'>
          <FontAwesomeIcon icon={faXmark} onClick={() => dispatch((ActiveSubMenuPuntoVenta({ user: {}, subMenuPuntoVenta: false })))} />
        </div>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__dataUser'>
          <h2>Información del punto de venta</h2>
          <br />
          <span>Nombre: <b>{activeMenuPuntoVenta.user.item?.nombre}</b></span>
          <span>Id del punto de venta: <b>{activeMenuPuntoVenta.user.item?.id_pv}</b></span>
          <span>Dirección: <b>{activeMenuPuntoVenta.user.item?.direccion}</b></span>
          {/* <span>Dispositivo: <b>{activeMenuPuntoVenta.user.item?.numero_serie_dispositivo}</b></span> */}
        </div>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs'>
          {
            horario?.length > 0 ? <>
              <h3>Horarios de este punto de venta</h3>
              {
                horario?.map((item: any, i: number) => (
                  <ItemHorario cargos={userCargo} key={i} registro={item} />
                ))
              }
            </> : <h3>No hay horarios para este punto</h3>
          }
        </div>
      </form>
    </>
  );
}

export default VerPuntoVenta;