import { useEffect, useState } from "react";
import "../css/downloadButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faSpinner } from "@fortawesome/free-solid-svg-icons";

function DownloadButton({ functionDescargar, load, nameButton, disable }) {
  const [isCompleted, setIsCompleted] = useState(true);

  useEffect(() => {
    if (load === true) {
      setIsCompleted(false);
    }else{
      setIsCompleted(true);
    }
  }, [load])

  const handleDownload = async () => {
    // setIsCompleted(false);
    if (functionDescargar !== null) {
      functionDescargar();
    }
  };

  return (
    // <div className="download-btn-container">
    <button
      onClick={handleDownload}
      className={`download-btn ${load ? "downloading" : ""} ${isCompleted! ? "completed" : ""}`}
      disabled={disable}
    >
      {!isCompleted ? (
        <>
          <FontAwesomeIcon className="icon-main" icon={faSpinner} />
          <span className="label">
            {load ? "Descargando..." : ""}
          </span>
        </>
      ) : (
        <>
          <FontAwesomeIcon className="icon-check" icon={faDownload} />
          <span className="label">{nameButton}</span>
        </>
      )}
    </button>
    // </div>
  );
}

export default DownloadButton;
