import React, { useEffect, useState } from 'react';

function EscogerDiaSemana({ activeEdition, arrayDia }) {
  const diaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const [semana, setSemana] = useState<string>('');
  let almacenDiasSemana: any = [];

  const check = (e, item) => {
    const checkDia: any = {
      check: e.target.checked,
      diaSemana: item
    }
    if (checkDia.check == false) {
      const newAlamacen = almacenDiasSemana.filter((item2, i) => item != item2.diaSemana);
      almacenDiasSemana = newAlamacen;
    } else {
      almacenDiasSemana.push(checkDia);
    }
    arrayDia(almacenDiasSemana);
  }

  return (
    <>
      <h2>Dias con este horario</h2>
      <select id='dia_semana' required disabled={activeEdition.activeEdition} onChange={(e) => setSemana(e.target.value)}>
        <option>--Escoge una opción--</option>
        <option value='toda_semana'>Toda la semana</option>
        <option value='dias_especificos'>Dias específicos</option>
      </select>

      {
        semana == 'dias_especificos' ? <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__dataUser__contcheck'>
          {
            diaSemana.map((item, i) => (<div key={i} className='App__dashboard__contPageOutlet__PageUsers__newUser__form__dataUser__contcheck__checkDia'>
              <label htmlFor={item}>{item}</label>
              <input width={3} type="checkbox" onChange={(e) => check(e, item)} id={item} value={item} />
            </div>))
          }
        </div> : null
      }
    </>
  );
}

export default EscogerDiaSemana;