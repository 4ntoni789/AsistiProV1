import { faBriefcase, faPencil, faTrash, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../css/itemCargo.css';

function ItemCargo({ item, edit, remove }) {
  return (
    <div className='App__init__tablaMarcaciones__body__item__cargo'>
      <div className='App__init__tablaMarcaciones__body__item__cargo__header'>
        <h4>
          <FontAwesomeIcon icon={faBriefcase} />
          {item.nombre_cargo}</h4>

        {/* <h4>{contrato[0]?.fecha_fin.toString().split('T')[0]}</h4> */}
        <div className='App__init__tablaMarcaciones__body__item__cargo__header__contVerRegistros'>
          <FontAwesomeIcon icon={faTrash} onClick={remove} /> <br />
          <FontAwesomeIcon icon={faPencil} onClick={edit} />
        </div>
        {/* <h4></h4> */}
      </div>

    </div>
  )
}

export default ItemCargo
