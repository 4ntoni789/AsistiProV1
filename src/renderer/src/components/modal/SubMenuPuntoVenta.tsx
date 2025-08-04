import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import VerPuntoVenta from './VerPuntoVenta';
import NewHorario from './NewHorario';
import { ActiveSubMenuPuntoVenta } from '@renderer/actions/actionsPuntoDeVenta';
import { AppDispatch } from '@renderer/store';
import '../../css/subMenuPuntoVenta.css'

function SubMenuPuntoVenta(props) {
  const activeMenuPuntoVenta = useSelector((state: any) => state.menuAccions.subMenuPuntoVenta);
  const [verPuntoVentaOHorario, setVerPuntoVentaOHorario] = useState(true);
  const dispatch = useDispatch<AppDispatch>()
  // const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);

  useEffect(() => {
    setVerPuntoVentaOHorario(true);
  }, [activeMenuPuntoVenta.subMenuPuntoVenta == false])

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      setVerPuntoVentaOHorario(false);
      dispatch((ActiveSubMenuPuntoVenta({ user: {}, subMenuPuntoVenta: false })));
    }
  };

  return (
    <div className={activeMenuPuntoVenta.subMenuPuntoVenta ? 'App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__active' :
      'App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta'}
      ref={modalRef} onClick={handleClickOutside}>
      <div className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__btnControl'>
        <button className={verPuntoVentaOHorario ? 'App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__btnControl__btn__active'
          : 'App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__btnControl__btn'}
          onClick={() => setVerPuntoVentaOHorario(true)}>Punto de venta y horarios</button>
        <button className={verPuntoVentaOHorario ? 'App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__btnControl__btn'
          : 'App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__btnControl__btn__active'}
          onClick={() => setVerPuntoVentaOHorario(false)}>Agregar nuevo horario</button>
      </div>
      <VerPuntoVenta activeSubModal={verPuntoVentaOHorario} />
      <NewHorario activeSubModal={verPuntoVentaOHorario} />
    </div>
  );
}

export default SubMenuPuntoVenta;