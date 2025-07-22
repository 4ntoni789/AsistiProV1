import '../../css/itemTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFingerprint, faUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { convertirEnPunto } from '@renderer/scripts/convertirCaracterPunto';
import { ActiveSubMenuEmpleado } from '@renderer/actions/actionsEmpleados';
import { ActiveMenuVerAccesos } from '@renderer/actions/actionsAccesos';

function ItemTable({ item, clickLoad, contrato }) {
  // const [activeSubMenuEmpleado, setActiveSubMenuEmpleado] = useState(false);
  const dispatch = useDispatch();

  const contFilter = contrato.find((c, i) => {
    if (c.estado == 'Activo') {
      return c
    }
  })


  return (
    <div className='App__init__tablaMarcaciones__body__item'>
      <div className='App__init__tablaMarcaciones__body__item__header'>
        <h4 onClick={() => {
          dispatch(ActiveSubMenuEmpleado({ user: item, subMenuEmpleado: true }));
        }}>
          <FontAwesomeIcon icon={faUser} />
          {convertirEnPunto(`${item.nombres} ${item.apellidos}`)}</h4>
        <h4>{item.cedula}</h4>
        {
          contFilter ? <>
            <h4>{contFilter.id_contrato}</h4>
            <h4>{contFilter.fecha_inicio.toString().split('T')[0]}</h4>
            {
              contFilter.fecha_fin ? <h4>{contFilter.fecha_fin.toString().split('T')[0]}</h4> : <h4></h4>
            }
          </> : <>
            <h4></h4>
            <h4></h4>
            <h4></h4>
          </>
        }
        {/* <h4>{contrato[0]?.fecha_fin.toString().split('T')[0]}</h4> */}
        <FontAwesomeIcon icon={faFingerprint} onClick={() =>
          dispatch(ActiveMenuVerAccesos({ user: item, subMenuVerAccesos: true, accesos: item }))} title='Ver registros' />
        {/* <h4></h4> */}
      </div>

    </div>
  );
}

export default ItemTable;