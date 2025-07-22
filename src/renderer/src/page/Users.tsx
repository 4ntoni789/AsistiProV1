import { useEffect, useState } from 'react';
import '../css/users.css';
import NewUser from '@renderer/components/modal/NewUser';
import { useDispatch, useSelector } from 'react-redux';
import UpdateUser from '@renderer/components/modal/UpdateUser';
import { ActiveSubMenuNewUsers, Fetch_user } from '@renderer/actions/actionsUsers';
import { AppDispatch } from '@renderer/store';
import { UserDataType } from '@renderer/typesTS';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ItemUsuario from '@renderer/components/items/ItemUsuario';
import { obtenerDatos } from '@renderer/scripts/obtenerDatosFetch';
import Buscandor from '@renderer/components/Buscandor';
import Paginacion from '@renderer/components/Paginacion';

function Users() {
  const [dataUsers, setDataUsers] = useState<any>();
  const spam = useSelector((state: any) => state.menuAccions.errorSpam);
  const userData = useSelector((state: UserDataType) => state.loginAccess);
  // const activeNewUsers = useSelector((state: any) => state.menuAccions);
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    obtenerDatos(null, dispatch(Fetch_user(userId)), setDataUsers);
  }, [userData.validationAccess, spam.active]);

  return (
    <div className='App__dashboard__contPageOutlet__PageUsers'>
      <div className='App__dashboard__contPageOutlet__PageUsers__contUsers'>
        <h2>Usuarios</h2>
        <div className='App__dashboard__contPageOutlet__PageUsers__contUsers__contBtnNewUser'>
          <Buscandor searchTerm={null} handleSearch={null} />
          <button disabled={userData.userLogin.type_role == 'Administrador' ? false : true} onClick={() => dispatch(ActiveSubMenuNewUsers({
            subMenuNewUsers: true
          }))} title='Nuevo usuario'>
            Nuevo usuario
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div className='App__dashboard__contPageOutlet__PageUsers__contUsers__table'>


          {
            dataUsers?.map((item, i) => (
              item.nombre_usuario == userData.userLogin.nombre_usuario ? null :
                <ItemUsuario key={i} nombre_usuario={item.nombre_usuario}
                  id_usuario={item.id_usuario}
                  correo={item.correo}
                  role={item.type_role}
                  estado={item.estado}
                  item={item}
                />
            ))
          }

        </div>
      <Paginacion />
      </div>
      <NewUser />
      <UpdateUser />
    </div>
  );
}

export default Users;
