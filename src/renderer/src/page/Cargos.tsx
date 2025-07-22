import { ActiveSubMenuNewCargo, ActiveSubMenuUpdateCargo, Fetch_cargos } from '@renderer/actions/actionsCargos';
import { ActiveSubMenuDeleteUsers } from '@renderer/actions/actionsUsers';
import ButtonStyle from '@renderer/components/ButtonStyle';
import NewCargo from '@renderer/components/modal/NewCargo';
import UpdateCargo from '@renderer/components/modal/UpdateCargo';
import { obtenerDatos } from '@renderer/scripts/obtenerDatosFetch';
import { AppDispatch } from '@renderer/store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Cargos(props) {
  const userData = useSelector((state: any) => state.loginAccess.validationAccess);
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);
  const spam = useSelector((state: any) => state.menuAccions.errorSpam);
  const [userCargo, setUserCargo] = useState<[object]>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    obtenerDatos(null, dispatch(Fetch_cargos(userId)), setUserCargo);
  }, [userData == true, spam.active]);

  return (
    <div className='App__dashboard__contPageOutlet__PageUsers'>
      <div className='App__dashboard__contPageOutlet__PageUsers__contUsers'>
        <h2>Cargos</h2>
        <div className='App__dashboard__contPageOutlet__PageUsers__contUsers__contBtnNewUser'>
          <ButtonStyle disabled={false} nameBtn='Nuevo' funtion={() => dispatch(ActiveSubMenuNewCargo({ user: {}, subMenuNewCargo: true }))} />
        </div>
        <div className='App__dashboard__contPageOutlet__PageUsers__contUsers__table'>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th>Id del cargo</th>
                <th>Nombre del cargo</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {
                userCargo?.map((item: any, i) => (
                  <tr key={i}>
                    <td>{item.id_cargo}</td>
                    <td>{item.nombre_cargo}</td>
                    <td><ButtonStyle disabled={false} funtion={() => dispatch(ActiveSubMenuUpdateCargo({ user: { item }, subMenuUpdateCargo: true }))}
                      nameBtn='Editar' /></td>
                    <td><ButtonStyle disabled={false} funtion={() => dispatch(ActiveSubMenuDeleteUsers({
                      user: item,
                      activeDeleteUsers: true,
                      typeRemove: 'Cargo'
                    }))}
                      nameBtn='Eliminar' /></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
      <NewCargo />
      <UpdateCargo />
    </div>
  );
}

export default Cargos;