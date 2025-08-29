import { faPencil, faTrash, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../css/itemEmpleador.css';

function ItemEmpleador({ item, edit, remove }) {

  return (
    <div className='App__init__tablaMarcaciones__body__item__empleador'>
      <div className='App__init__tablaMarcaciones__body__item__empleador__header'>
        <h4>
          <FontAwesomeIcon icon={faUserTie} />
          Empleador: <b>{item.nombre_empleador}</b></h4>

        {/* <h4>{contrato[0]?.fecha_fin.toString().split('T')[0]}</h4> */}
        <div className='App__init__tablaMarcaciones__body__item__empleador__header__contVerRegistros'>
          <FontAwesomeIcon icon={faTrash} onClick={remove} /> <br />
          <FontAwesomeIcon icon={faPencil} onClick={edit} />
        </div>
        {/* <h4></h4> */}
      </div>

    </div>
  )
}

export default ItemEmpleador
