import { useEffect, useState } from 'react';
import '../css/marcacionesEnDirecto.css';
import ItemMarcacionDirecto from './items/ItemMarcacionDirecto';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@renderer/store';
import { obtenerDatos } from '@renderer/scripts/obtenerDatosFetch';
import { Fetch_accesos_ayer, Fetch_accesos_dia } from '@renderer/actions/actionsAccesos';
import LoaderItems from './LoaderItems';

function MarcacionesEnDirecto({ }) {
  const [dataUser, setDataUser] = useState<any[]>();
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);
  const [switchBtn, setSwitchBtn] = useState(false);
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    setDataUser([]);
    const intervalo = setInterval(async () => {
      if (!switchBtn) {
        obtenerDatos(null, dispatch(Fetch_accesos_dia(userId)), setDataUser);
      } else {
        obtenerDatos(null, dispatch(Fetch_accesos_ayer(userId)), setDataUser);
      }
    }, 1000)
    return () => clearInterval(intervalo);
  }, [switchBtn])


  return (
    <div className='App__init__marcacionesEnDirecto'>
      <h2>Marcaciones en directo</h2>
      <div className='App__init__marcacionesEnDirecto__switch'>
        <button className={!switchBtn ? 'App__init__marcacionesEnDirecto__switch__btn__active'
          : 'App__init__marcacionesEnDirecto__switch__btn'} onClick={() => setSwitchBtn(false)}>Hoy</button>
        <button className={switchBtn ? 'App__init__marcacionesEnDirecto__switch__btn__active'
          : 'App__init__marcacionesEnDirecto__switch__btn'} onClick={() => setSwitchBtn(true)}>Ayer</button>
      </div>
      <div className='App__init__marcacionesEnDirecto__body'>
        {dataUser?.length === 0 ? <LoaderItems />: dataUser?.map((item, index) => (
        <ItemMarcacionDirecto key={index} item={item} isNew={index === -1} />
        ))}
      </div>
    </div>
  );
}

export default MarcacionesEnDirecto;