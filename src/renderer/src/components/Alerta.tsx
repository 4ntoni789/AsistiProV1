import { faCircleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../css/alerta.css';
import { useEffect, useState } from 'react';

type AlertaType = {
    reactiveAlert: boolean,
    nameAlert: string
}

function Alerta({ reactiveAlert, nameAlert }: AlertaType) {
    const [aparecer, setAparecer] = useState<boolean>(true);

    useEffect(() => {
        setAparecer(true)
    }, [reactiveAlert == false])

    return (
        <div className={aparecer ? 'Alerta__active' : 'Alerta'}>
            <div className='Alerta__text'>
                <FontAwesomeIcon icon={faCircleExclamation} />
                <span>{nameAlert}</span>
            </div>
            <div className='Alerta__close' onClick={() => setAparecer(false)}><FontAwesomeIcon icon={faXmark} /></div>
        </div>
    )
}

export default Alerta
