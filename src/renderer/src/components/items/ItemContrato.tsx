import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../css/itemContrato.css';
import { faFileContract } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@renderer/store';
import { ActiveMenuVerContrato } from '@renderer/actions/actionsContratos';
import { convertirEnPunto } from '@renderer/scripts/convertirCaracterPunto';

function ItemContrato({ item }) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className='App__dashboard__contPageOutlet__PageUsers__contContratos__table__itemHorario'>
      <div className='App__dashboard__contPageOutlet__PageUsers__contContratos__table__itemHorario__header'>
        <div className='App__dashboard__contPageOutlet__PageUsers__contContratos__table__itemHorario__header__icon'>
          <h4 onClick={() => dispatch(ActiveMenuVerContrato({ user: item, subMenuVerContrato: true }))} ><FontAwesomeIcon icon={faFileContract} />
            Empleado: <span>{convertirEnPunto(item.nombres)}</span></h4>
        </div>
        <div className='App__dashboard__contPageOutlet__PageUsers__contContratos__table__itemHorario__header__info'>
          <h4>Cargo: <span>{item.nombre_cargo}</span></h4>
          <h4>Tipo de contrato: <span> {item.tipo_contrato}</span></h4>
          {/* <h4>Empleador: <span> {window.innerWidth <= 1366 ? convertirEnPunto(item.nombre_empleador) : item.nombre_empleador}</span></h4> */}
        </div>
        <div className='App__dashboard__contPageOutlet__PageUsers__contContratos__table__itemHorario__header__contspan'>
          <h4>Id: <span>{item.id_contrato}</span></h4>
          {item.meses ? <h4>Meses: <span>{item.meses}</span></h4> : null}
          <h4>Estado: <span className={item.estado == 'Activo' ? 'App__dashboard__contPageOutlet__PageUsers__contContratos__table__itemHorario__header__contspan__activo' :
            'App__dashboard__contPageOutlet__PageUsers__contContratos__table__itemHorario__header__contspan__inactivo'}>{item.estado}</span></h4>
          <h4>Fecha inicio: <span>{item.fecha_inicio?.toString().split('T')[0]}</span></h4>
          {
            item.fecha_fin ? <h4>Fecha fin: <span>{item.fecha_fin?.toString().split('T')[0]}</span></h4> : <h4>Fecha fin:<span>Indifinido</span></h4>
          }
        </div>
      </div>
    </div>
  )
}

export default ItemContrato
