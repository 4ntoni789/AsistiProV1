import MarcacionesEnDirecto from '@renderer/components/MarcacionesEnDirecto';
import TablaDeMarcaciones from '@renderer/components/tablas/TablaDeEmpleadosMarcaciones';
import '../css/inicio.css';
import '../css/empleados.css';
import ButtonStyle from '@renderer/components/ButtonStyle';
import { useDispatch, useSelector } from 'react-redux';
import { ActiveSubMenuNewEmpleado } from '@renderer/actions/actionsLogin';
import NewEmpleado from '@renderer/components/modal/NewEmpleado';
import { useEffect } from 'react';

function Empleados(props) {
  // const type_role = useSelector((state: any) => state.loginAccess.userLogin.type_role);
  const dispatch = useDispatch();
  // const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);


  // useEffect(() => {
  //   const intervalo = setInterval(async () => {
  //     try {
  //       const response = await fetch('/api/accesos', {
  //         headers: {
  //           'x-id-usuario': userId
  //         }
  //       });
  //       if (!response.ok) throw new Error('Error en la respuesta del servidor');
        
  //     } catch (err) {
  //       console.error('Error al obtener accesos:', err);
  //     }
  //   }, 500)
  //   return () => clearInterval(intervalo);
  // }, [])

  return (
    <div className='App__init'>
      <div className='App__init__encabezado'>
        <h2>Empleados</h2>
        <div className='App__init__encabezado__btnEmpleados'>
          <ButtonStyle funtion={() => dispatch(ActiveSubMenuNewEmpleado({ user: {}, activeNewEmpleado: true }))} disabled={false} nameBtn='Nuevo Empleado' />
        </div>
      </div>
      <div className='App__init__contTable'>
        <TablaDeMarcaciones />
        <MarcacionesEnDirecto />
      </div>
      <NewEmpleado />
    </div>
  );
}

export default Empleados;