import { faPencil, faTrash, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../css/itemRoles.css';

function ItemRol({ item, edit, remove }) {

  return (
    <div className='App__init__tablaMarcaciones__body__item__role'>
      <div className='App__init__tablaMarcaciones__body__item__role__header'>
        <h4>
          <FontAwesomeIcon icon={faUsers} />
          {item.nombre_rol}</h4>

        {/* <h4>{contrato[0]?.fecha_fin.toString().split('T')[0]}</h4> */}
        <div className='App__init__tablaMarcaciones__body__item__role__header__contVerRegistros'>
          <FontAwesomeIcon icon={faTrash} onClick={remove} /> <br />
          <FontAwesomeIcon icon={faPencil} onClick={edit} />
        </div>
        {/* <h4></h4> */}
      </div>

    </div>
  )
}

export default ItemRol;
