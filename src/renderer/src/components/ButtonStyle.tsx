import React from 'react';

function ButtonStyle({ nameBtn, funtion, disabled }) {
  return (
    <button disabled={disabled} className='App__dashboard__contPageOutlet__PageUsers__contUsers__contBtnNewUser__btn' onClick={funtion}>
      {nameBtn}
    </button>
  );
}

export default ButtonStyle;