import { useEffect, useState } from 'react';
import '../css/contratosPorVencer.css';
import ItemContratosPorVencer from './items/ItemContratosPorVencer';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerDatos } from '@renderer/scripts/obtenerDatosFetch';
import { AppDispatch } from '@renderer/store';
import { Fetch_contratosPorVencer } from '@renderer/actions/actionsContratos';
import LoaderItems from './LoaderItems';

function ContratosPorVencer() {
  const userData = useSelector((state: any) => state.loginAccess.validationAccess);
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);
  const dispatch = useDispatch<AppDispatch>();
  const [contratosPorVencer, setContratosPorVencer] = useState<any>();
  const spam = useSelector((state: any) => state.menuAccions.errorSpam);

  useEffect(() => {
    obtenerDatos(null, dispatch(Fetch_contratosPorVencer(userId)), setContratosPorVencer);
  }, [userData == true, spam])

  return (
    <div className='App__dashboard__contPageOutlet__PageUsers__contratosPorVencer'>
      <h2>Contratos por vencer</h2>
      <div className='App__dashboard__contPageOutlet__PageUsers__contratosPorVencer__contContratosPorVencer'>
        {
          contratosPorVencer?.length === 0 ? null : contratosPorVencer === undefined
            ? <LoaderItems /> : contratosPorVencer?.proximosAVencer.map((item: any, i: number) => (
              <ItemContratosPorVencer key={i} item={item} index={i} />
            ))
        }
      </div>
      <h2>Contratos vencidos</h2>
      <div className='App__dashboard__contPageOutlet__PageUsers__contratosPorVencer__contContratosPorVencer'>
        {
          contratosPorVencer?.length === 0 ? null : contratosPorVencer === undefined
            ? <LoaderItems /> : contratosPorVencer?.vencidos.map((item: any, i: number) => (
              <ItemContratosPorVencer key={i} item={item} index={i + 1} />
            ))
        }
      </div>
    </div>
  )
}

export default ContratosPorVencer
