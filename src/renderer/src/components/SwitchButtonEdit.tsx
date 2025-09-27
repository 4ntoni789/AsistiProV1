import '../css/switchButton.css';

function SwitchButtonEdit({activeEdition,setActiveEdition}) {
  return (
    <>
      <div className={!activeEdition ? 'toggle__active' : 'toggle'}>
        <label className={!activeEdition ? 'toggle__label__active' : 'toggle__label'}>
          <input type='checkbox' onClick={setActiveEdition}  className='toggle__input' />
        </label>
      </div>
    </>
  );
}

export default SwitchButtonEdit;