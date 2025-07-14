
function FormularioReportSeleccionado({ seleted, register }) {
  switch (seleted) {
    case 'Asistencia general':
      return (
        <>
          <span>Fecha de inicio: </span>
          <input type="date" id='fecha_inicio' {...register('fecha_inicio',
            { required: true, disabled: false })} />
          <span>Fecha de fin: </span>
          <input type="date" id='fecha_fin' {...register('fecha_fin',
            { required: true, disabled: false })} />

        </>
      )
    case 'Asistencia diaria':
      return (
        <>
          <span>Dia específico: </span>
          <input type="date" id='fecha_inicio' {...register('fecha_inicio',
            { required: true, disabled: false })} />

        </>
      )
    case 'Asistencia semanal':
      return (
        <>
          <span>Inicio de semana (Lunes) : </span>
          <input type="date" id='fecha_inicio' {...register('fecha_inicio',
            { required: true, disabled: false })} />

        </>
      )
    case 'Asistencia mensual':
      return (
        <>
          <span>Inicio del mes deseado (01) : </span>
          <input type="date" id='fecha_inicio' {...register('fecha_inicio',
            { required: true, disabled: false })} />
        </>
      )

    case 'Asistencias por empleado':
      return (
        <>
          <span>Fecha de inicio: </span>
          <input type="date" id='fecha_inicio' {...register('fecha_inicio',
            { required: true, disabled: seleted == '' ? true : false })} />
            <span> </span>
          <span>Fecha de fin: </span>
          <input type="date" id='fecha_fin' {...register('fecha_fin',
            { required: true, disabled: seleted == '' ? true : false })} />
        </>
      )

    default:
      return (
        <>
          <span>Fecha de inicio: </span>
          <input type="date" id='fecha_inicio' {...register('fecha_inicio',
            { required: true, disabled: seleted == '' ? true : false })} />
          <span>Fecha de fin: </span>
          <input type="date" id='fecha_fin' {...register('fecha_fin',
            { required: true, disabled: seleted == '' ? true : false })} />
        </>
      )
  }
}

export default FormularioReportSeleccionado;