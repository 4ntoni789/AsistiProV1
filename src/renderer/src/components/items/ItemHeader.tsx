
function ItemHeader({ n1, n2, n3, n4, n5 }: { n1: string, n2: string, n3: string, n4: string, n5: string }) {
  return (
    <div className='App__init__tablaMarcaciones__body__itemHeader'>
      <div className='App__init__tablaMarcaciones__body__itemHeader__header'>
        <h4>{n1}</h4>
        <h4>{n2}</h4>
        <h4>{n3}</h4>
        <h4>{n4}</h4>
        <h4>{n5}</h4>
        {/* <h4>Ver registros</h4> */}
        {/* <h4></h4> */}
      </div>

    </div>
  )
}

export default ItemHeader
