import { useEffect, useRef } from 'react'
import Loader from './components/Loader'
import DeleteUser from './components/modal/DeleteUser'
import ErrorSpam from './components/modal/ErrorSpam'
import Enrutado from './router/Enrutado'
import { useDispatch, useSelector } from 'react-redux'
import { Logout, SubmitLogin } from './actions/actionsLogin'
import MemoriaLocal from './components/MemoriaLocal'
import { AppDispatch } from './store'
const apiUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

function App(): React.JSX.Element {
  const userData = useSelector((state: any) => state.loginAccess.validationAccess);
  const userId = useSelector((state: any) => state.loginAccess.userLogin?.id_usuario);
  const sseRef = useRef<EventSource | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || userData) return;

    const validarToken = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/validar-token`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (result.success) {
          // Token válido: guardar datos del usuario en Redux
          dispatch(SubmitLogin(result.user));
        } else {
          // Token inválido o expirado
          dispatch(Logout());
        }
      } catch (err) {
        console.error("Error validando token:", err);
        dispatch(Logout());
      }
    };

    validarToken();
  }, [dispatch, userData]);

  useEffect(() => {
    if (!userData || sseRef.current) return;

    const source = new EventSource(`${apiUrl}/api/eventos-login?id_usuario=${userId}&token=${token}`);
    sseRef.current = source;
    source.addEventListener("login", (event) => {
      console.log("🔔 Evento login:", JSON.parse(event.data));
    });

    source.addEventListener("usuario_online", (event) => {
      console.log("🔔 Evento login:", JSON.parse(event.data));
    });


    source.onerror = (err) => {
      console.error('SSE error:', err);
      source.close();
      sseRef.current = null;
      // dispatch(Logout());
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
