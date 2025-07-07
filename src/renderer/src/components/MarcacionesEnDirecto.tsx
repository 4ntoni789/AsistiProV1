import React, { useEffect, useState } from 'react';
import '../css/marcacionesEnDirecto.css';
import ItemTable from './items/ItemTable';
import ItemMarcacionDirecto from './items/ItemMarcacionDirecto';

function MarcacionesEnDirecto(props) {
  const [dataUser, setDataUser] = useState<any[]>();

  useEffect(() => {
    const intervalo = setInterval(async () => {
      try {
        const response = await fetch('/api/accesosdia');
        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        const data = await response.json();
        setDataUser(data);
      } catch (err) {
        console.error('Error al obtener accesos:', err);
      }
    }, 500)
    return () => clearInterval(intervalo);
  }, [])

  return (
    <div className='App__init__marcacionesEnDirecto'>
      <h2>Ultimos registros</h2>
      <div className='App__init__marcacionesEnDirecto__body'>
        {dataUser?.map((item, index) => (
          <ItemMarcacionDirecto key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default MarcacionesEnDirecto;