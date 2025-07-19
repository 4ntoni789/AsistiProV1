import '../../css/itemTableHeader.css'

function ItemTableHeader({}) {
  return (
    <div className='App__init__tablaMarcaciones__body__itemHeader'>
      <div className='App__init__tablaMarcaciones__body__itemHeader__header'>
        <h4>Nombre</h4>
        <h4>Identificación</h4>
        <h4>N-Contrato</h4>
        <h4>Fecha inicio</h4>
        <h4>Fecha fin</h4>
        <h4>Ver registros</h4>
        {/* <h4></h4> */}
      </div>
      
    </div>
  );
}

export default ItemTableHeader;