import '../../css/ItemContratosPorVencer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileContract } from '@fortawesome/free-solid-svg-icons';
import { ActiveMenuVerContrato } from '@renderer/actions/actionsContratos';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@renderer/store';

function ItemContratosPorVencer({ item }) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className='App__dashboard__contPageOutlet__PageUsers__contratosPorVencer__contContratosPorVencer__itemContratosPorVencer item-destacado'
      onClick={() => dispatch(ActiveMenuVerContrato({ user: item, subMenuVerContrato: true }))}
      title={`Contrato por vencer en: ${item.dias_restantes} dias`}>
      <div className='App__dashboard__contPageOutlet__PageUsers__contratosPorVencer__contContratosPorVencer__itemContratosPorVencer__ico'>
        <FontAwesomeIcon icon={faFileContract} />
      </div>
      <div className='App__dashboard__contPageOutlet__PageUsers__contratosPorVencer__contContratosPorVencer__itemContratosPorVencer__info'>
        <h5><span>Fecha de vecimiento: <b>{item.fecha_fin.toString().split('T')[0]}</b></span></h5>
        <h5><span>Empleado: <b>{item.nombres}</b></span></h5>
        <h5><span>Estado: <b>{item.estado}</b></span></h5>
        <h5><span>Prórrogas: <b>{item.cantidad_prorrogas}</b></span></h5>
        <h5><span>Dias restantes: <b>{item.dias_restantes}</b></span></h5>
        <h5><span><b>{item.id_contrato}</b></span></h5>
      </div>
    </div>
  )
}

export default ItemContratosPorVencer
