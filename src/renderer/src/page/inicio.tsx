import React from 'react';
import '../css/inicio.css';
import TablaDeMarcaciones from '@renderer/components/tablas/TablaDeEmpleadosMarcaciones';
import MarcacionesEnDirecto from '@renderer/components/MarcacionesEnDirecto';

function inicio(props) {
  return (
    <div className='App__init'>
      <div className='App__init__encabezado'>
        <h2>Dashboard</h2>
      </div>
      {/* <div className='App__init__contTable'>
        <TablaDeMarcaciones />
        <MarcacionesEnDirecto />
      </div> */}
    </div>
  );
}

export default inicio;