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

  const sseRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!userData || sseRef.current) return;

    const source = new EventSource('/api/eventos-login');
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

  // const cerrarSesion = async () => {
  //   // 1. Cerrar SSE
  //   if (sseRef.current) {
  //     sseRef.current.close();
  //     sseRef.current = null;
  //     console.log('🔌 SSE cerrada manualmente');
  //   }
  // }

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
