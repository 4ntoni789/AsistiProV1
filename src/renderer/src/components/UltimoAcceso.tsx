import React from "react";
import "../css/ultimoAcceso.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

type UltimoAccesoProps = {
  fechaHora: string;
  ip: string;
  plataforma: string;
};

const UltimoAcceso: React.FC<UltimoAccesoProps> = ({
  fechaHora,
  ip,
  plataforma,
}) => {
  return (
    <div className="ultimo-acceso">
      <div className="header">
        <h2 className="title">
          <span className="icon">🕒</span> Último Acceso
        </h2>
        {/* <div className="refresh">
          <FontAwesomeIcon icon={faArrowsRotate}/>
        </div> */}
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Fecha y Hora</th>
              <th>IP</th>
              <th>Plataforma</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{fechaHora}</td>
              <td>{ip}</td>
              <td>{plataforma}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UltimoAcceso;
