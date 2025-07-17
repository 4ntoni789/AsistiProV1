import React, { useEffect, useState } from 'react';
import '../css/marcacionesEnDirecto.css';
import ItemTable from './items/ItemTable';
import ItemMarcacionDirecto from './items/ItemMarcacionDirecto';
import { useSelector } from 'react-redux';

function MarcacionesEnDirecto(props) {
  const [dataUser, setDataUser] = useState<any[]>();
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);
  const [switchBtn, setSwitchBtn] = useState(false);

  useEffect(() => {
    setDataUser([]);
    const intervalo = setInterval(async () => {
      try {
        if (!switchBtn) {
          const response = await fetch('/api/accesos-dia', {
            headers: {
              'x-id-usuario': userId
            }
          });
          if (response.ok) {
            const data = await response.json();
            setDataUser(data);
          } else {
            throw new Error('Error en la respuesta del servidor');
          }
        } else {
          const response = await fetch('/api/accesos-ayer', {
            headers: {
              'x-id-usuario': userId
            }
          });
          if (response.ok) {
            const data = await response.json();
            setDataUser(data);
          } else {
            throw new Error('Error en la respuesta del servidor');
          }
        }
      } catch (err) {
        console.error('Error al obtener accesos:', err);
      }
    }, 500)
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
        {dataUser?.map((item, index) => (
          <ItemMarcacionDirecto key={index} item={item} isNew={index === -1} />
        ))}
      </div>
    </div>
  );
}

export default MarcacionesEnDirecto;