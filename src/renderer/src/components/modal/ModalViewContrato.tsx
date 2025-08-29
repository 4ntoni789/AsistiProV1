import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../../css/modalViewContrato.css';
import { AppDispatch } from "@renderer/store";
import { formatearNumero } from "@renderer/scripts/formatearNumero";
import { ActiveSubMenuDeleteUsers } from "@renderer/actions/actionsUsers";
import { ActiveMenuVerContrato, Fetch_generar_contrato, Fetch_prorroga_contrato } from "@renderer/actions/actionsContratos";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { obtenerDatos } from "@renderer/scripts/obtenerDatosFetch";
import { Fetch_cargos } from "@renderer/actions/actionsCargos";
import { Fetch_empleadores } from "@renderer/actions/actionsEmpleadores";
import { Fetch_empleados } from "@renderer/actions/actionsEmpleados";
import { obtenerDatosPrimerCoincidencia } from "@renderer/scripts/obtenerDatosFetchPrimer";
import LoaderItems from "../LoaderItems";


function ModalViewContrato() {
  const activeVerContrato = useSelector((state: any) => state.menuAccions.subMenuVerContrato);
  const dispatch = useDispatch<AppDispatch>();
  const [loader, setLoader] = useState<boolean>(false);
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);
  const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const [userCargo, setUserCargo] = useState<any>();
  const [empleadores, setEmpleadores] = useState<any>([{}]);
  const [empleado, setEmpleado] = useState<any>();
  const modalRef = useRef<HTMLDivElement>(null);

  const contFilterEmpleador = empleadores?.find((e, i) => {
    if (e.id_empleador === activeVerContrato.user.id_empleador) {
      return e
    }
  })

  const GenerarContrato = async () => {
    dispatch(Fetch_generar_contrato(empleado[0], userCargo, activeVerContrato.user, contFilterEmpleador, userData, setLoader, userId))
  };


  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      dispatch(ActiveMenuVerContrato({ user: {}, subMenuVerContrato: false }));
    }
  };

  useEffect(() => {
    obtenerDatosPrimerCoincidencia(dispatch(Fetch_empleados(userId)), setEmpleado, activeVerContrato.user.id_empleado);
    obtenerDatos(null, dispatch(Fetch_cargos(userId)), setUserCargo);
    obtenerDatos(null, dispatch(Fetch_empleadores(userId)), setEmpleadores);
  }, [activeVerContrato.subMenuVerContrato == true]);

  return (
    <div ref={modalRef} className={activeVerContrato.subMenuVerContrato ? 'App__dashboard__contPageOutlet__PageUsers__modalViewContrato__active' :
      'App__dashboard__contPageOutlet__PageUsers__modalViewContrato'} onClick={handleClickOutside}>
      {
        <div className={activeVerContrato.subMenuVerContrato ? 'App__dashboard__contPageOutlet__PageUsers__menuUser__contDataUser__active' :
          'App__dashboard__contPageOutlet__PageUsers__menuUser__contDataUser'}>
          <div className='App__dashboard__contPageOutlet__PageUsers__menuUser__contDataUser__btnClose'>
            <FontAwesomeIcon icon={faXmark} onClick={() => {
              dispatch(dispatch(ActiveMenuVerContrato({ user: {}, subMenuVerContrato: false })))
            }} />
          </div>
          <div className='App__dashboard__contPageOutlet__PageUsers__menuUser__contDataUser__contInfo'>
            {
              Object.keys(activeVerContrato.user).length === 0 ? <LoaderItems /> :
                <>
                  <h2>Información laboral</h2>
                  <span>Nombre: <b>{activeVerContrato.user.nombres}</b></span>
                  <span>Empleador: <b>{activeVerContrato.user.nombre_empleador}</b></span>
                  <span>Tipo de contrato: <b>{activeVerContrato.user.tipo_contrato}</b></span>
                  <span>Fecha de inicio: <b>{activeVerContrato.user.fecha_inicio?.toString().split('T')[0]}</b></span>
                  {
                    activeVerContrato.user.fecha_fin ? <span>Fecha de finalización: <b>{activeVerContrato.user.fecha_fin.toString().split('T')[0]}</b></span> : null
                  }
                  <span>Numero de contrato: <b>{activeVerContrato.user.id_contrato}</b></span>
                  <span>Estado: <b>{activeVerContrato.user.estado} ({activeVerContrato.user.estado_contrato})</b></span>
                  <span>Salario: <b>{formatearNumero(String(activeVerContrato.user.salario))}</b></span>
                  {
                    activeVerContrato.user?.tipo_contrato == 'Fijo' || activeVerContrato.user?.tipo_contrato == 'Fijo Manejo y Confianza' ? <>
                      <span>Prórroga: <b>{activeVerContrato.user.cantidad_prorrogas}</b></span>
                      <span>Meses: <b>{activeVerContrato.user.meses}</b></span>
                    </> : null
                  }
                  <span>Cargo: <b>{activeVerContrato.user.nombre_cargo}</b></span>
                  <h2>Opciones de contrato</h2>
                  <div className='App__dashboard__contPageOutlet__PageUsers__menuUser__contDataUser__contInfo__contBtn'>
                    {
                      activeVerContrato.user?.tipo_contrato == 'Fijo' || activeVerContrato.user?.tipo_contrato == 'Fijo Manejo y Confianza' ? <button className='btn_style' type='submit' onClick={() => {
                        dispatch(Fetch_prorroga_contrato(userData, activeVerContrato.user))
                      }}>Prórroga {activeVerContrato.user.dias_restantes != undefined ? activeVerContrato.user.estado_contrato === 'VIGENTE' ? < span > Prorroga automatica en: {activeVerContrato.user.dias_restantes} dias</span> : null : null}</button> : null
                    }
                    {
                      activeVerContrato.user.estado === 'Activo' ? <input type="button" value="Finalizar contrato" className='btn_style' onClick={() => {
                        dispatch(ActiveMenuVerContrato({ user: {}, subMenuVerContrato: false }))
                        dispatch(ActiveSubMenuDeleteUsers({ user: activeVerContrato.user, activeDeleteUsers: true, typeRemove: 'Contrato' }));
                      }} /> : null
                    }
                    <input type="button" value={loader ? 'Generando archivo...' : "Descargar contrato"} disabled={loader} className='btn_style'
                      onClick={() => GenerarContrato()} />
                  </div>
                </>
            }
          </div>
        </div>
      }
    </div >
  )
}

export default ModalViewContrato;