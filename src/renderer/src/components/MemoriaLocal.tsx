import { ActivatedMenu } from '@renderer/actions/actionsLogin';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function MemoriaLocal(props) {
    const dataUser = useSelector((state: any) => state.loginAccess.userLogin);
    const dispatch = useDispatch();

    useEffect(() => {
        if (Object.keys(dataUser).length !== 0) {
            const memoriaMenuOptions = localStorage.getItem(`uiOptions${dataUser.id_usuario}`);
            const memoriaMenu = memoriaMenuOptions ? JSON.parse(memoriaMenuOptions) : {
                menuActive: true,
                user: {
                    correo: "Default",
                    estado: "Default",
                    id_rol: 'Default',
                    id_usuario: 'Default',
                    nombre_usuario: "Default",
                    type_role: "Default"
                }
            };
            dispatch(ActivatedMenu(memoriaMenu.menuActive));

        }
    }, [dataUser])
}

export default MemoriaLocal;