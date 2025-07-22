import ButtonStyle from '@renderer/components/ButtonStyle';
import TablaPuntoVenta from '@renderer/components/tablas/TablaPuntoVenta';
import { useDispatch, useSelector } from 'react-redux';
import '../css/puntoVenta.css';
import NewPuntoVenta from '@renderer/components/modal/NewPuntoVenta';
import UpdatePuntoVenta from '@renderer/components/modal/UpdatePuntoVenta';
import { ActiveSubMenuNewPuntoVenta } from '@renderer/actions/actionsPuntoDeVenta';
function PuntoVenta(props) {
  const type_role = useSelector((state: any) => state.loginAccess.userLogin.type_role);
  const dispatch = useDispatch();

  return (
    <div className='App__init__puntoVenta'>
      <div className='App__init__puntoVenta__encabezado'>
        <h2>Puntos de venta</h2>
        <div className='App__init__puntoVenta__encabezado__btnEmpleados'>
          <ButtonStyle funtion={() => dispatch(ActiveSubMenuNewPuntoVenta({ user: {}, subMenuNewPuntoVenta: true }))} disabled={type_role == 'Administrador' ? false : true} nameBtn='Nuevo punto de venta' />
        </div>
      </div>
      <div className='App__init__puntoVenta__contTable'>
        <TablaPuntoVenta />
      </div>
      <NewPuntoVenta />
      <UpdatePuntoVenta/>
    </div>
  );
}

export default PuntoVenta;