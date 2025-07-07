import { useSelector } from 'react-redux';
import UpdateEmpleado from './UpdateEmpleado';
import UpdateEmpleadoContrato from './UpdateEmpleadoContrato';
import { useEffect, useState } from 'react';
import VerPuntoVenta from './VerPuntoVenta';
import NewHorario from './NewHorario';

function SubMenuPuntoVenta(props) {
  const activeMenuPuntoVenta = useSelector((state: any) => state.menuAccions.subMenuPuntoVenta);
  const [verPuntoVentaOHorario, setVerPuntoVentaOHorario] = useState(true);

  useEffect(() => {
    setVerPuntoVentaOHorario(true);
  }, [activeMenuPuntoVenta.subMenuPuntoVenta == false])

  return (
    <div className={activeMenuPuntoVenta.subMenuPuntoVenta ? 'App__dashboard__contPageOutlet__PageUsers__newUser__active' : 'App__dashboard__contPageOutlet__PageUsers__newUser'}>
      <div className='App__dashboard__contPageOutlet__PageUsers__newUser__btnControl'>
        <button className={verPuntoVentaOHorario ? 'App__dashboard__contPageOutlet__PageUsers__newUser__btnControl__btn__active' : 'App__dashboard__contPageOutlet__PageUsers__newUser__btnControl__btn'}
          onClick={() => setVerPuntoVentaOHorario(true)}>Datos del punto de venta</button>
        <button className={verPuntoVentaOHorario ? 'App__dashboard__contPageOutlet__PageUsers__newUser__btnControl__btn' : 'App__dashboard__contPageOutlet__PageUsers__newUser__btnControl__btn__active'}
          onClick={() => setVerPuntoVentaOHorario(false)}>Agregar nuevo horario</button>
      </div>
      {
        verPuntoVentaOHorario ? <VerPuntoVenta/> : <NewHorario />
      }
    </div>
  );
}

export default SubMenuPuntoVenta;