import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ButtonStyle({ nameBtn, funtion, disabled, ico }) {
  return (
    <button disabled={disabled} className='App__dashboard__contPageOutlet__PageUsers__contUsers__contBtnNewUser__btn' onClick={funtion} tabIndex={2}>
      {nameBtn}
      {ico ? <FontAwesomeIcon icon={ico} /> : null}
    </button>
  );
}

export default ButtonStyle;