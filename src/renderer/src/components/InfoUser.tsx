import { ActiveSubMenuDeleteUsers } from '@renderer/actions/actionsUsers'
import { AppDispatch } from '@renderer/store'
import { useDispatch } from 'react-redux'

function InfoUser({ dataUser }) {
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div className='App__dashboard__contPageOutlet__user__perfil__opcions'>
      <span>Nombre de usuario: <b>{dataUser.nombre_usuario}</b></span>
      <span>Correo: <b>{dataUser.correo}</b></span>
      <span>Id de usuario: <b>{dataUser.id_usuario}</b></span>
      <span>Estado de este usuario: <b>{dataUser.estado}</b></span>
      <span>Rol de este usuario: <b>{dataUser.type_role}</b></span>

      <button tabIndex={4} className='btn_style' onClick={() =>
        dispatch(ActiveSubMenuDeleteUsers({
          user: {},
          activeDeleteUsers: true,
          typeRemove: 'Logout'
        }))}>Cerrar sesión</button>
    </div>
  )
}

export default InfoUser
