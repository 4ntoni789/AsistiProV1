import { useEffect, useState } from 'react';
import '../css/users.css';

import NewUser from '@renderer/components/modal/NewUser';
import { useDispatch, useSelector } from 'react-redux';
import { ActiveSubMenuDeleteUsers, ActiveSubMenuNewUsers, ActiveSubMenuUpdateUsers } from '@renderer/actions/actionsLogin';
import SwitchButton from '@renderer/components/SwitchButton';
import UpdateUser from '@renderer/components/modal/UpdateUser';
import ButtonStyle from '@renderer/components/ButtonStyle';

function Users() {
  const [dataUsers, setDataUsers] = useState<any>();
  const spam = useSelector((state: any) => state.menuAccions.errorSpam);
  const userData = useSelector((state: any) => state.loginAccess);
  // const activeNewUsers = useSelector((state: any) => state.menuAccions);
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/api/usuarios', {
      headers: {
        'x-id-usuario': userId
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setDataUsers(data);
      })
      .catch((err) => console.error('Error:', err));
  }, [userData.validationAccess, spam.active]);


  return (
    <div className='App__dashboard__contPageOutlet__PageUsers'>
      <div className='App__dashboard__contPageOutlet__PageUsers__contUsers'>
        <h2>Usuarios</h2>
        <div className='App__dashboard__contPageOutlet__PageUsers__contUsers__contBtnNewUser'>
          <ButtonStyle disabled={userData.userLogin.type_role == 'Administrador' ? false : true} nameBtn='Nuevo' funtion={() => dispatch(ActiveSubMenuNewUsers(true))} />
        </div>
        <div className='App__dashboard__contPageOutlet__PageUsers__contUsers__table'>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {
                dataUsers?.map((item, i) => (
                  item.nombre_usuario == userData.userLogin.nombre_usuario ? null : <tr key={i}>
                    <td>{item.id_usuario}</td>
                    <td>{item.nombre_usuario}</td>
                    <td>{item.correo}</td>
                    <td>{item.type_role}</td>
                    <td><SwitchButton disabled={false} estado={item} /></td>
                    <td><ButtonStyle disabled={userData.userLogin.type_role == 'Administrador' ? false : true} funtion={() => dispatch(ActiveSubMenuUpdateUsers({
                      user: item,
                      subMenuUpdateUser: true
                    }))} nameBtn='Editar' /></td>
                    <td><ButtonStyle disabled={userData.userLogin.type_role == 'Administrador' ? false : true} funtion={() => dispatch(ActiveSubMenuDeleteUsers({
                      user: item,
                      activeDeleteUsers: true,
                      typeRemove: 'Usuario'
                    }))} nameBtn='Eliminar' /></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
      <NewUser />
      <UpdateUser />
    </div>
  );
}

export default Users;
