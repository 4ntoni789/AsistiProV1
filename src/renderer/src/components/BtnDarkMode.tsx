import { useEffect } from 'react';
import '../css/btnDarkMode.css';
import { useDispatch, useSelector } from 'react-redux';
import { ActiveDarkMode } from '@renderer/actions/actionsLogin';

const BtnDarkMode = () => {
    const darkMode = useSelector((state: any) => state.menuAccions.darkMode);
    const dataUser = useSelector((state: any) => state.loginAccess.userLogin);
    const dispatch = useDispatch();


    useEffect(() => {
        const storageKey = `uiOptions${dataUser.id_usuario}`;
        const memoriaStr = localStorage.getItem(storageKey);
        const memoriaAnterior = memoriaStr ? JSON.parse(memoriaStr) : {};
        const memoriaActualizada = {
            ...memoriaAnterior,
            darkMode,
            user: dataUser
        };

        localStorage.setItem(storageKey, JSON.stringify(memoriaActualizada));
    }, [darkMode])


    return (
        <button tabIndex={1}
            className={`toggle-container ${darkMode ? 'dark' : ''}`}
            onClick={() => dispatch(ActiveDarkMode(!darkMode))}
            aria-label="Toggle dark mode"
        >
            <span className="toggle-circle" />
            <span className="icon">{darkMode ? '🌙' : '☀️'}</span>
        </button>
    );
};

export default BtnDarkMode;
