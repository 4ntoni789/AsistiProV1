import { faEllipsisVertical, faPencil, faShop, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import '../../css/itemTablePuntoVenta.css';
import { ActiveSubMenuDeleteUsers } from '@renderer/actions/actionsUsers';
import { ActiveSubMenuPuntoVenta, ActiveSubMenuUpdatePuntoVenta } from '@renderer/actions/actionsPuntoDeVenta';

function ItemTablePuntoVenta({ item }) {
  const dispatch = useDispatch();
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
  }, [isOpen]);

  return (
    <div className='App__init__tablaPuntoVenta__body__item'>
      <div className='App__init__tablaPuntoVenta__body__item__header'>
        <h4><FontAwesomeIcon onClick={() => dispatch(ActiveSubMenuPuntoVenta({ user: {item}, subMenuPuntoVenta: true }))} icon={faShop} /> {item.nombre}</h4>
        <div className='App__init__tablaPuntoVenta__body__item__header__controls'>
          <h4>{item.direccion}</h4>
          {/* <h4>{item.id_pv}</h4> */}
          {/* <h4>{contrato[0]?.fecha_fin.toString().split('T')[0]}</h4> */}
          <FontAwesomeIcon ref={buttonRef} icon={faEllipsisVertical} onClick={() => setIsOpen(!isOpen)} title='Opciones' />
          {/* <h4></h4> */}

        </div>
        <div className={isOpen ? 'App__init__contTable__tablaMarcaciones__header__contBtn__contOptionsPuntoVenta__active' :
          'App__init__contTable__tablaMarcaciones__header__contBtn__contOptionsPuntoVenta'}>
          <span onClick={() => {
            dispatch(ActiveSubMenuUpdatePuntoVenta({
              user: item,
              subMenuUpdatePuntoVenta: true
            }))
          }}><FontAwesomeIcon icon={faPencil} /> Editar</span>
          <span onClick={() => dispatch(ActiveSubMenuDeleteUsers({
            user: item,
            activeDeleteUsers: true,
            typeRemove: 'Punto-venta'
          }))}><FontAwesomeIcon icon={faTrash} /> Eliminar</span>
        </div>
      </div>
    </div>
  )
}

export default ItemTablePuntoVenta;