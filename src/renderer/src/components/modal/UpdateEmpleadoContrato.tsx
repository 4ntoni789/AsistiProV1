import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormEmpleadoContrato from '../FormEmpleadoContrato';
import { Fetch_contratos } from '@renderer/actions/actionsContratos';
import { obtenerDatosPrimerCoincidencia } from '@renderer/scripts/obtenerDatosFetchPrimer';
import { AppDispatch } from '@renderer/store';
import { obtenerDatos } from '@renderer/scripts/obtenerDatosFetch';
import { Fetch_cargos } from '@renderer/actions/actionsCargos';
import { Fetch_empleadores } from '@renderer/actions/actionsEmpleadores';
import '../../css/updateEmpleadoContrato.css';
import DataUser from '../DataUserContrato';

function UpdateEmpleadoContrato({ activeSubModal }: { activeSubModal: boolean }) {
  const activeNewEmpleado = useSelector((state: any) => state.menuAccions.subMenuEmpleado);
  const [activeEdition, setActiveEdition] = useState(true);
  const [userCargo, setUserCargo] = useState<any>();
  const [userContrato, setUserContrato] = useState<any>();
  const [empleadores, setEmpleadores] = useState<[object]>([{}]);
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);

  useEffect(() => {
    obtenerDatosPrimerCoincidencia(dispatch(Fetch_contratos(userId)), setUserContrato, activeNewEmpleado.user.id_empleado);
    obtenerDatos(dispatch(Fetch_cargos(userId)), setUserCargo);
    obtenerDatos(dispatch(Fetch_empleadores(userId)), setEmpleadores);
  }, [activeNewEmpleado.subMenuEmpleado == true]);

  const contFilter = userContrato?.find((c, i) => {
    if (c.estado == 'Activo') {
      return c
    }
  })

  return (
    <>
      {
        userContrato?.length > 0 && contFilter?.estado == 'Activo' ?
          <DataUser activeSubModal={!activeSubModal} userContrato={userContrato} userCargo={userCargo} activeNewEmpleado={activeNewEmpleado}
            activeEdition={activeEdition} empleadores={empleadores} />
          : <FormEmpleadoContrato userCargo={userCargo} activeNewEmpleado={activeNewEmpleado}
            empleadores={empleadores} activeSubModal={!activeSubModal} />
      }
    </>
  );
}

export default UpdateEmpleadoContrato;