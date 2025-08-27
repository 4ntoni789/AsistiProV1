import { faGear } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import '../css/construccion.css';

function Contruccion({ title }: { title: string }) {
    return (
        <div className="rotateConstrution" title={title}>
            <FontAwesomeIcon icon={faGear} />
        </div>
    )
}

export default Contruccion
