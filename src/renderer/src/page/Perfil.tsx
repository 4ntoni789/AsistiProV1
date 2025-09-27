import { useSelector } from 'react-redux';
import InfoUser from '@renderer/components/InfoUser';
import '../css/perfil.css'
import { formatearHoraLocal2 } from '@renderer/scripts/formatearHora';
import UltimoAcceso from '@renderer/components/UltimoAcceso';
import { userAgentInfo } from '@renderer/scripts/userAgentInfo';

function Perfil() {
  const dataUser = useSelector((state: any) => state.loginAccess.userLogin)

  return (
    <div className='App__dashboard__contPageOutlet__user__perfil'>
      <div className='App__dashboard__contPageOutlet__user__perfil__view'>
        <div className='App__dashboard__contPageOutlet__user__perfil__view__userLenght'>
          <h2>{dataUser.nombre_usuario[0].toUpperCase()}</h2>
        </div>
        <h3>{dataUser.type_role}</h3>
        <h2>{dataUser.nombre_usuario}</h2>
      </div>
      <hr />
      <br />
      <InfoUser dataUser={dataUser} />
      {/* <UpdateSingleUser />
      <UpdatePass /> */}
      <UltimoAcceso fechaHora={formatearHoraLocal2(dataUser.ultimo_inicio_sesion.fecha_hora_inicio)} ip={dataUser.ultimo_inicio_sesion.ip}
        plataforma={userAgentInfo(dataUser.ultimo_inicio_sesion.plataforma)} />
    </div>
  )
}

export default Perfil;
