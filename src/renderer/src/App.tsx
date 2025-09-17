import { useEffect, useRef } from 'react'
import Loader from './components/Loader'
import DeleteUser from './components/modal/DeleteUser'
import ErrorSpam from './components/modal/ErrorSpam'
import Enrutado from './router/Enrutado'
import { useDispatch, useSelector } from 'react-redux'
import MemoriaLocal from './components/MemoriaLocal'
import { AppDispatch } from './store'
import Notificaciones from './components/Notificaciones'
import { ConnectSse, DesconetarSse, ValidarToken } from './actions/actionsLogin'
const token = localStorage.getItem("token");

function App(): React.JSX.Element {
  const userData = useSelector((state: any) => state.loginAccess.validationAccess);
  const userId = useSelector((state: any) => state.loginAccess.userLogin?.id_usuario);
  const sseRef = useRef<EventSource | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const stateConexion = useSelector((state: any) => state.loginAccess.conexionSse);

  useEffect(() => {
    if (!token || userData) return;
    dispatch(ValidarToken());
  }, [dispatch, userData]);

  useEffect(() => {     
    if (!userData || sseRef.current) return;
    dispatch(ConnectSse(userId, sseRef));
    return () => {
      dispatch(DesconetarSse(sseRef));
    };
  }, [userData, stateConexion]);

  return (
    <>
      <Notificaciones />
      <MemoriaLocal />
      <Enrutado />
      <Loader />
      <DeleteUser />
      <ErrorSpam />
    </>
  )
}

export default App
