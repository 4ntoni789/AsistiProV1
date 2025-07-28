import { faCircleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../css/alerta.css';
import { useEffect, useState } from 'react';

function Alerta({ reactiveAlert }) {
    const [aparecer, setAparecer] = useState<boolean>(true);

    useEffect(() => {
        setAparecer(true)
    }, [reactiveAlert == false])

    return (
        <div className={aparecer ? 'Alerta__active' : 'Alerta'}>
            <div className='Alerta__text'>
                <FontAwesomeIcon icon={faCircleExclamation} />
                <span>Este empleado no tiene contrato</span>
            </div>
            <div className='Alerta__close' onClick={() => setAparecer(false)}><FontAwesomeIcon icon={faXmark} /></div>
        </div>
    )
}

export default Alerta
