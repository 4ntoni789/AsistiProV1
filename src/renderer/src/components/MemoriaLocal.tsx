import { ActivatedMenu, ActiveDarkMode } from '@renderer/actions/actionsLogin';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function MemoriaLocal(props) {
    const dataUser = useSelector((state: any) => state.loginAccess.userLogin);
    const dispatch = useDispatch();

    useEffect(() => {
        if (Object.keys(dataUser != null ? dataUser : {}).length !== 0) {
            const memoriaLocalUi = localStorage.getItem(`uiOptions${dataUser.id_usuario}`);
            const memoriaUi = memoriaLocalUi ? JSON.parse(memoriaLocalUi) : {
                menuActive: true,
                darkMode: true,
                user: {
                    correo: "Default",
                    estado: "Default",
                    id_rol: 'Default',
                    id_usuario: 'Default',
                    nombre_usuario: "Default",
                    type_role: "Default"
                }
            };
            dispatch(ActivatedMenu(memoriaUi.menuActive));
            dispatch(ActiveDarkMode(memoriaUi.darkMode))
        }
    }, [dataUser])
}

export default MemoriaLocal;