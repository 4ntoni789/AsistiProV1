import MarcacionesEnDirecto from '@renderer/components/MarcacionesEnDirecto';
import TablaDeMarcaciones from '@renderer/components/tablas/TablaDeEmpleadosMarcaciones';
import '../css/inicio.css';
import '../css/empleados.css';
import NewEmpleado from '@renderer/components/modal/NewEmpleado';

function Empleados({}) {
  // const type_role = useSelector((state: any) => state.loginAccess.userLogin.type_role);
  // const dispatch = useDispatch();
  // const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);

  return (
    <div className='App__init'>
      <div className='App__init__contTable'>
        <TablaDeMarcaciones />
        <MarcacionesEnDirecto />
      </div>
      <NewEmpleado />
    </div>
  );
}

export default Empleados;