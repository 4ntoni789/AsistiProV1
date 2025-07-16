import { useEffect, useRef } from 'react'
import electronLogo from './assets/electron.svg'
import Loader from './components/Loader'
import DeleteUser from './components/modal/DeleteUser'
import ErrorSpam from './components/modal/ErrorSpam'
import Login from './page/Login'
import Enrutado from './router/Enrutado'
import { useDispatch, useSelector } from 'react-redux'
import { Logout } from './actions/actionsLogin'
import MemoriaLocal from './components/MemoriaLocal'

function App(): React.JSX.Element {
  const userData = useSelector((state: any) => state.loginAccess.validationAccess);
  const userId = useSelector((state: any) => state.loginAccess.userLogin?.id_usuario);
  const sseRef = useRef<EventSource | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userData || sseRef.current) return;

    const source = new EventSource(`/api/eventos-login?id_usuario=${userId}`);
    sseRef.current = source;

    source.onerror = (err) => {
      console.error('SSE error:', err);
      source.close();
      sseRef.current = null;
      dispatch(Logout());
    };

    return () => {
      source.close();
      sseRef.current = null;
    };
  }, [userData]);

  return (
    <>
      <MemoriaLocal />
      <Enrutado />
      <Loader />
      <DeleteUser />
      <ErrorSpam />
    </>
  )
}

export default App
