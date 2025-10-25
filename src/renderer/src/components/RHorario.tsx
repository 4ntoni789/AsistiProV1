import { useEffect, useState } from 'react';
import '../css/rHorario.css';
import { obtenerDatos } from '@renderer/scripts/obtenerDatosFetch';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@renderer/store';
import { Fetch_horario } from '@renderer/actions/actionsHorario';
import ItemHorario from './items/ItemHorario';
import { Fetch_cargos } from '@renderer/actions/actionsCargos';

function RHorario({ active, setDataRHorario }) {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);
  const [horario, setHorario] = useState<[]>([]);
  const [userCargo, setUserCargo] = useState<[]>([]);
  const activeMenuPuntoVenta = useSelector((state: any) => state.menuAccions.subMenuPuntoVenta);

  useEffect(() => {
    obtenerDatos(dispatch(Fetch_horario(userId, activeMenuPuntoVenta)), setHorario);
    obtenerDatos(dispatch(Fetch_cargos(userId)), setUserCargo);
  }, [active == true]);


  return (
    <div className={active ? 'App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__rHorario__active'
      : 'App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__rHorario'}>
      <div className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__rHorario__contRHorario'>
        {
          horario?.length > 0 ? <>
            <h2>Reutilizar horarios</h2>
            {
              horario?.map((item: any, i: number) => (
                <ItemHorario dataHorario={setDataRHorario} cargos={userCargo} key={i} registro={item} />
              ))
            }
          </> : <span>No hay horarios para este punto</span>
        }
      </div>
    </div>
  )
}

export default RHorario
