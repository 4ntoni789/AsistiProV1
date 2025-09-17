import '../../css/itemTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCircleCheck, faFileCircleXmark, faFingerprint, faUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { ActiveSubMenuEmpleado } from '@renderer/actions/actionsEmpleados';
import { ActiveMenuVerAccesos } from '@renderer/actions/actionsAccesos';

function ItemTable({ item, contrato }) {
  // const [activeSubMenuEmpleado, setActiveSubMenuEmpleado] = useState(false);
  const dispatch = useDispatch();

  const contFilter = contrato?.find((c, i) => {
    if (c.estado == 'Activo') {
      return c
    }
  })

  return (
    <div className={contFilter?.id_contrato ? 'App__init__tablaMarcaciones__body__item' : 'App__init__tablaMarcaciones__body__item__sinContrato'}>
      <div className='App__init__tablaMarcaciones__body__item__header'>
        <h4 onClick={() => {
          dispatch(ActiveSubMenuEmpleado({ user: item, subMenuEmpleado: true }));
        }} title='Nombre de usuario'>
          <FontAwesomeIcon icon={faUser} />
          {`${item.nombres} ${item.apellidos}`}</h4>
        <h4 title='Cedula'>CC: {item.cedula}</h4>
        {
          <>
            <h4>{contFilter?.id_contrato ? <FontAwesomeIcon icon={faFileCircleCheck} title='Contracto activo' /> : <FontAwesomeIcon icon={faFileCircleXmark} title='Sin contracto' />}</h4>
            {item?.registros[0] ? <h4>Ultima marcación: {item?.registros[0].nombre_dispositivo}</h4> : <span>Sin marcaciones</span>}

          </>
        }
        {/* <h4>{contrato[0]?.fecha_fin.toString().split('T')[0]}</h4> */}
        <div className='App__init__tablaMarcaciones__body__item__header__contVerRegistros'>
          <FontAwesomeIcon icon={faFingerprint} onClick={() =>
            dispatch(ActiveMenuVerAccesos({ user: item, subMenuVerAccesos: true, accesos: item }))} title='Ver registros' />
        </div>
        {/* <h4></h4> */}
      </div>

    </div>
  );
}

export default ItemTable;