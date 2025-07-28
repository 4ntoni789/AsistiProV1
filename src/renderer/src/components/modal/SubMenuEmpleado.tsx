import { useDispatch, useSelector } from 'react-redux';
import UpdateEmpleado from './UpdateEmpleado';
import { useEffect, useRef, useState } from 'react';
import '../../css/menuEmpleados.css';
import { AppDispatch } from '@renderer/store';
import UpdateEmpleadoContrato from './UpdateEmpleadoContrato';
import { ActiveSubMenuEmpleado } from '@renderer/actions/actionsEmpleados';

function MenuEmpleado({ }) {
  const activeNewEmpleado = useSelector((state: any) => state.menuAccions.subMenuEmpleado);
  const [verEmpleadosOContrato, setVerEmpleadosOContrato] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    setVerEmpleadosOContrato(true);
  }, [activeNewEmpleado.subMenuEmpleado == false])

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      setVerEmpleadosOContrato(false);
      dispatch(ActiveSubMenuEmpleado({ user: {}, subMenuEmpleado: false }));
    }
  };

  return (
    <div className={activeNewEmpleado.subMenuEmpleado ? 'App__dashboard__contPageOutlet__PageUsers__menuUser__active' : 'App__dashboard__contPageOutlet__PageUsers__menuUser'}
      ref={modalRef} onClick={handleClickOutside}>
      <div className='App__dashboard__contPageOutlet__PageUsers__menuUser__btnControl'>
        <button className={verEmpleadosOContrato ? 'App__dashboard__contPageOutlet__PageUsers__menuUser__btnControl__btn__active' : 'App__dashboard__contPageOutlet__PageUsers__menuUser__btnControl__btn'}
          onClick={() => setVerEmpleadosOContrato(true)}>Datos del empleado</button>
        <button className={verEmpleadosOContrato ? 'App__dashboard__contPageOutlet__PageUsers__menuUser__btnControl__btn' : 'App__dashboard__contPageOutlet__PageUsers__menuUser__btnControl__btn__active'}
          onClick={() => setVerEmpleadosOContrato(false)}>Datos laborales</button>
      </div>

      <UpdateEmpleado activeSubModal={verEmpleadosOContrato} />

      <UpdateEmpleadoContrato activeSubModal={verEmpleadosOContrato} />
    </div>
  );
}

export default MenuEmpleado;