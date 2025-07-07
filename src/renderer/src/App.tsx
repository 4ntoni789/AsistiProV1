import { useEffect, useRef } from 'react'
import electronLogo from './assets/electron.svg'
import Loader from './components/Loader'
import DeleteUser from './components/modal/DeleteUser'
import ErrorSpam from './components/modal/ErrorSpam'
import Login from './page/Login'
import Enrutado from './router/Enrutado'
import { useSelector } from 'react-redux'

function App(): React.JSX.Element {
  const userData = useSelector((state: any) => state.loginAccess.validationAccess);
  const userId = useSelector((state: any) => state.loginAccess.userLogin?.id_usuario);
  const sseRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!userData || sseRef.current) return;

    const source = new EventSource(`/api/eventos-login?id_usuario=${userId}`);
    sseRef.current = source;

    source.onerror = (err) => {
      console.error('SSE error:', err);
      source.close();
      sseRef.current = null;
    };
    
    return () => {
      source.close();
      sseRef.current = null;
    };
  }, [userData]);


  return (
    <>
      <Enrutado />
      <Loader />
      <DeleteUser />
      <ErrorSpam />
    </>
  )
}

export default App
