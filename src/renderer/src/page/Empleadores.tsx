import { faEllipsisVertical, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActiveSubMenuDeleteUsers, ActiveSubMenuNewEmpleador, ActiveSubMenuUpdateEmpleador } from '@renderer/actions/actionsLogin';
import ButtonStyle from '@renderer/components/ButtonStyle';
import NewEmpleador from '@renderer/components/modal/NewEmpleador';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../css/empleadores.css';
import UpdateEmpleador from '@renderer/components/modal/UpdateEmpleador';

function Empleadores(props) {
  const userData = useSelector((state: any) => state.loginAccess.validationAccess);
    const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);
  
  const spam = useSelector((state: any) => state.menuAccions.errorSpam);
  const [empleadores, setEmpleadores] = useState<[object]>();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/api/empleadores', {
      headers: {
        'x-id-usuario': userId
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setEmpleadores(data)
      })
      .catch((err) => console.error('Error:', err));
  }, [userData == true, spam.active]);

  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<any | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;

      if (buttonRef.current && !buttonRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen]);;

  return (
    <div className='App__dashboard__contPageOutlet__PageUsers'>
      <div className='App__dashboard__contPageOutlet__PageUsers__contUsers'>
        <h2>Empleadores</h2>
        <div className='App__dashboard__contPageOutlet__PageUsers__contUsers__contBtnNewUser'>
          <ButtonStyle disabled={false} nameBtn='Nuevo' funtion={() => dispatch(ActiveSubMenuNewEmpleador({ user: {}, subMenuNewEmpleador: true }))} />
        </div>
        <div className='App__dashboard__contPageOutlet__PageUsers__contUsers__table'>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th>Id del empleador</th>
                <th>Nombre del empleador</th>
                <th>Nit del empleador</th>
                <th>Direccion del empleador</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {
                empleadores?.map((item: any, i) => (
                  <tr key={i}>
                    <td>{item.id_empleador}</td>
                    <td>{item.nombre_empleador}</td>
                    <td>{item.nit}</td>
                    <td>{item.direccion_empleador}</td>
                    <td>
                      <ButtonStyle disabled={false} funtion={() => dispatch(ActiveSubMenuUpdateEmpleador({ user: { item }, subMenuUpdateEmpleador: true }))}
                        nameBtn='Editar' />
                    </td>
                    <td>
                      <ButtonStyle disabled={false} funtion={() => dispatch(ActiveSubMenuDeleteUsers({
                        user: item,
                        activeDeleteUsers: true,
                        typeRemove: 'Empleador'
                      }))}
                        nameBtn='Eliminar' />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
      <NewEmpleador />
      <UpdateEmpleador/>
    </div>
  );
}

export default Empleadores;