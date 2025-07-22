
import { ActiveSubMenuNewRole, ActiveSubMenuUpdateRole, Fetch_roles } from '@renderer/actions/actionsRoles';
import { ActiveSubMenuDeleteUsers } from '@renderer/actions/actionsUsers';
import ButtonStyle from '@renderer/components/ButtonStyle';
import NewRole from '@renderer/components/modal/NewRole';
import UpdateRole from '@renderer/components/modal/UpdateRole';
import { obtenerDatos } from '@renderer/scripts/obtenerDatosFetch';
import { AppDispatch } from '@renderer/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Roles({ }) {
  const userData = useSelector((state: any) => state.loginAccess.validationAccess);
  const spam = useSelector((state: any) => state.menuAccions.errorSpam);
  const [userRoles, setUserRoles] = useState<[any]>();
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    obtenerDatos(null, dispatch(Fetch_roles(userId)), setUserRoles);
  }, [userData == true, spam.active]);

  return (
    <div className='App__dashboard__contPageOutlet__PageUsers'>
      <div className='App__dashboard__contPageOutlet__PageUsers__contUsers'>
        <h2>Roles</h2>
        <div className='App__dashboard__contPageOutlet__PageUsers__contUsers__contBtnNewUser'>
          <ButtonStyle disabled={false} nameBtn='Nuevo' funtion={() => dispatch(ActiveSubMenuNewRole({ user: {}, subMenuNewRole: true }))} />
        </div>
        <div className='App__dashboard__contPageOutlet__PageUsers__contUsers__table'>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th>Id del rol</th>
                <th>Nombre del rol</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {
                userRoles?.map((item: any, i) => (
                  <tr key={i}>
                    <td>{item.id_rol}</td>
                    <td>{item.nombre_rol}</td>
                    <td><ButtonStyle disabled={false} funtion={() => dispatch(ActiveSubMenuUpdateRole({ user: { item }, subMenuUpdateRole: true }))}
                      nameBtn='Editar' /></td>
                    <td><ButtonStyle disabled={false} funtion={() => dispatch(ActiveSubMenuDeleteUsers({
                      user: item,
                      activeDeleteUsers: true,
                      typeRemove: 'Rol'
                    }))}
                      nameBtn='Eliminar' /></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
      <NewRole />
      <UpdateRole />
    </div>
  );
}

export default Roles;