import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActiveSubMenuPuntoVenta } from '@renderer/actions/actionsLogin';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import ItemHorario from '../ItemHorario';

function VerPuntoVenta(props) {
  const activeMenuPuntoVenta = useSelector((state: any) => state.menuAccions.subMenuPuntoVenta);
  const activeModalDelete = useSelector((state: any) => state.menuAccions.deleteUser);
  const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const [horario, setHorario] = useState<any>({});
  // const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/api/horarios')
      .then((res) => res.json())
      .then((data) => {
        const resultado = data
          .filter((item: any) => item.id_pv === activeMenuPuntoVenta.user?.item?.id_pv)
          .reduce((acc: any[], curr: any) => {
            const existente = acc.find(g => g.turno === curr.turno && g.cargo === curr.id_cargo);

            if (existente) {
              existente.horarios.push(curr);
            } else {
              acc.push({
                turno: curr.turno,
                cargo: curr.id_cargo,
                horarios: [curr]
              });
            }
            return acc;
          }, []);

        setHorario(resultado);
      })
      .catch((err) => console.error('Error:', err));
  }, [activeMenuPuntoVenta.subMenuPuntoVenta == true, activeModalDelete]);

  return (
    <>
      <form className='App__dashboard__contPageOutlet__PageUsers__newUser__form'>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__close'>
          <FontAwesomeIcon icon={faXmark} onClick={() => dispatch((ActiveSubMenuPuntoVenta({ user: {}, subMenuPuntoVenta: false })))} />
        </div>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__dataUser'>
          <h2>Información del punto de venta</h2>
          <br />
          <span>Nombre: <b>{activeMenuPuntoVenta.user.item?.nombre}</b></span>
          <span>Id del punto de venta: <b>{activeMenuPuntoVenta.user.item?.id_pv}</b></span>
          <span>Dirección: <b>{activeMenuPuntoVenta.user.item?.direccion}</b></span>
          {/* <span>Dispositivo: <b>{activeMenuPuntoVenta.user.item?.numero_serie_dispositivo}</b></span> */}
        </div>
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs'>
          {
            horario?.length > 0 ? <>
              <h3>Horarios de este punto de venta</h3>
              {
                horario?.map((item: any, i: number) => (
                  <ItemHorario key={i} registro={item} />
                ))
              }
            </> : <h3>No hay horarios para este punto</h3>
          }
        </div>
      </form>
    </>
  );
}

export default VerPuntoVenta;