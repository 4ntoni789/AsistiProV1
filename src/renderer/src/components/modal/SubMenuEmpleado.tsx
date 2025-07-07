import { useDispatch, useSelector } from 'react-redux';
import UpdateEmpleado from './UpdateEmpleado';
import { useEffect, useState } from 'react';
import '../../css/menuEmpleados.css';
import UpdateEmpleadoContrato from './UpdateEmpleadoContrato';

function MenuEmpleado({ }) {
  const activeNewEmpleado = useSelector((state: any) => state.menuAccions.subMenuEmpleado);
  const [verEmpleadosOContrato, setVerEmpleadosOContrato] = useState(true);

  useEffect(() => {
    setVerEmpleadosOContrato(true);
  }, [activeNewEmpleado.subMenuEmpleado == false])

  return (
    <div className={activeNewEmpleado.subMenuEmpleado ? 'App__dashboard__contPageOutlet__PageUsers__newUser__active' : 'App__dashboard__contPageOutlet__PageUsers__newUser'}>
      <div className='App__dashboard__contPageOutlet__PageUsers__newUser__btnControl'>
        <button className={verEmpleadosOContrato ? 'App__dashboard__contPageOutlet__PageUsers__newUser__btnControl__btn__active' : 'App__dashboard__contPageOutlet__PageUsers__newUser__btnControl__btn'}
          onClick={() => setVerEmpleadosOContrato(true)}>Datos del empleado</button>
        <button className={verEmpleadosOContrato ? 'App__dashboard__contPageOutlet__PageUsers__newUser__btnControl__btn' : 'App__dashboard__contPageOutlet__PageUsers__newUser__btnControl__btn__active'}
          onClick={() => setVerEmpleadosOContrato(false)}>Datos laborales</button>
      </div>
      {
        verEmpleadosOContrato ? <UpdateEmpleado /> : <UpdateEmpleadoContrato />
      }
    </div>
  );
}

export default MenuEmpleado;