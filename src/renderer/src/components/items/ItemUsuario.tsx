import { faCircleUser, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import '../../css/itemUsuario.css';
import SwitchButton from "../SwitchButton";
import { ActiveSubMenuDeleteUsers, ActiveSubMenuUpdateUsers } from "@renderer/actions/actionsUsers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@renderer/store";


function ItemUsuario({ nombre_usuario, id_usuario, correo, role, estado, item }: {
  nombre_usuario: string, id_usuario: number, correo: string, role: string, estado: string,
  item: any
}) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="App__dashboard__contPageOutlet__PageUsers__contUsers__table__usuario">
      <div className="App__dashboard__contPageOutlet__PageUsers__contUsers__table__usuario__cont">
        <span className={item.enlinea ? "App__dashboard__contPageOutlet__PageUsers__contUsers__table__usuario__cont__online__active"
          : "App__dashboard__contPageOutlet__PageUsers__contUsers__table__usuario__cont__online"} title="En linea"></span>
        <h2><FontAwesomeIcon icon={faCircleUser} /> {nombre_usuario} <span>{id_usuario}</span></h2>
        <div className="App__dashboard__contPageOutlet__PageUsers__contUsers__table__usuario__cont__body">
          <div>
            <h3>Correo: <b>{correo}</b></h3>
            <h3>Rol:  <b>{role}</b></h3>
            <h3 className={estado == 'activo' ? 'App__dashboard__contPageOutlet__PageUsers__contUsers__table__usuario__cont__body__active' :
              'App__dashboard__contPageOutlet__PageUsers__contUsers__table__usuario__cont__body__noActive'}>{estado}</h3>
          </div>
        </div>
        <div className="App__dashboard__contPageOutlet__PageUsers__contUsers__table__usuario__cont__footer">
          <div className="App__dashboard__contPageOutlet__PageUsers__contUsers__table__usuario__cont__footer__contBtn1">
            <SwitchButton disabled={false} estado={item} />
          </div>

          <div className="App__dashboard__contPageOutlet__PageUsers__contUsers__table__usuario__cont__footer__contBtn2">
            <FontAwesomeIcon icon={faPenToSquare} onClick={() => dispatch(ActiveSubMenuUpdateUsers({
              user: item,
              subMenuUpdateUser: true
            }))} />
            <FontAwesomeIcon icon={faTrash} onClick={() => dispatch(ActiveSubMenuDeleteUsers({
              user: item,
              activeDeleteUsers: true,
              typeRemove: 'Usuario'
            }))} />
          </div>
        </div>
      </div>
    </div>
  )
}


export default ItemUsuario