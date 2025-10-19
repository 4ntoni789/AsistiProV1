import { contador } from '@renderer/scripts/contador';
import React, { useEffect, useState } from 'react'

type TypeTemporizador = {
  activar: boolean;
  finalizar: boolean;
}

function Temporizador({ activar, finalizar }: TypeTemporizador) {
  const [minutos, setMinutos] = useState(10);
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    if (activar === true && finalizar === false) {
      const clearContador = contador(minutos, setMinutos, setSegundos, finalizar);
      return clearContador;
    }
  }, [activar, finalizar])


  return (
    <h4> {minutos}:{segundos.toString().padStart(2, "0")}</h4>
  )
}

export default Temporizador
