import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActiveErrorSpam, ActiveSubMenuDeleteUsers, ActiveSubMenuEmpleado } from '@renderer/actions/actionsLogin';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import SwitchButtonEdit from '../SwitchButtonEdit';
import { calcularFechaFinal } from '@renderer/scripts/calcularFecha';
import Loader2 from '../Loader2';
import Loader from '../Loader';
import DataUser from '../DataUser';
import FormEmpleadoContrato from '../FormEmpleadoContrato';

function UpdateEmpleadoContrato(props) {
  const activeNewEmpleado = useSelector((state: any) => state.menuAccions.subMenuEmpleado);
  const [activeEdition, setActiveEdition] = useState(true);
  const [userCargo, setUserCargo] = useState<any>();
  const [userContrato, setUserContrato] = useState<any>();
  const [empleadores, setEmpleadores] = useState<[object]>([{}]);
  const dispatch = useDispatch();


  useEffect(() => {
    fetch('/api/contratos')
      .then((res) => res.json())
      .then((data) => {
        setUserContrato(data.filter((item) => (item.id_empleado == activeNewEmpleado.user.id_empleado)))
      })
      .catch((err) => console.error('Error:', err));

    fetch('/api/cargos')
      .then((res) => res.json())
      .then((data) => {
        setUserCargo(data);
      })
      .catch((err) => console.error('Error:', err));

    fetch('/api/empleadores')
      .then((res) => res.json())
      .then((data) => {
        setEmpleadores(data);
      })
      .catch((err) => console.error('Error:', err));
  }, [activeNewEmpleado.subMenuEmpleado == true]);

  const contFilter = userContrato?.find((c, i) => {
    if (c.estado == 'Activo') {
      return c
    }
  })

  return (
    <>
      <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form'>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__close'>
          <FontAwesomeIcon icon={faXmark} onClick={() => {
            dispatch(ActiveSubMenuEmpleado({ user: {}, subMenuEmpleado: false }));
          }} />
        </div>
        {
          userContrato == undefined ? <Loader /> : userContrato?.length > 0 && contFilter?.estado == 'Activo' ?
            <DataUser userContrato={userContrato} userCargo={userCargo} activeNewEmpleado={activeNewEmpleado} activeEdition={activeEdition} empleadores={empleadores}/>
            : <FormEmpleadoContrato activeEdition={activeEdition} setActiveEdition={setActiveEdition} userCargo={userCargo} activeNewEmpleado={activeNewEmpleado}
              empleadores={empleadores} />
        }
      </div>
    </>
  );
}

export default UpdateEmpleadoContrato;