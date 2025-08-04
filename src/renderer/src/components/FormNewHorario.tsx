import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faClock } from '@fortawesome/free-solid-svg-icons';
import { WorkScheduleBar } from './WorkScheduleBar';
import { Props, UserDataType } from '@renderer/typesTS';
import { horaToDecimal } from '@renderer/scripts/horaDecimal';
import { Fetch_new_horario } from '@renderer/actions/actionsHorario';
import { AppDispatch } from '@renderer/store';
import RHorario from './RHorario';

function FormNewHorario(userCargo) {
  const puntoVenta = useSelector((state: any) => state.menuAccions.subMenuPuntoVenta);
  const { register, handleSubmit, reset } = useForm();
  const userData = useSelector((state: UserDataType) => state.loginAccess.userLogin);
  const dispatch = useDispatch<AppDispatch>();
  const turnos = [1, 2, 3, 4];
  const diaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const [semana, setSemana] = useState<string>('');
  let almacenDiasSemana: any = [];
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);
  const [rHorario, setRHorario] = useState<boolean>(false);
  const [dataRHorario, setDataRHorario] = useState<{}>({});

  const [valoresLineaTiempo, setValoresLineaTiempo] = useState<Props>({
    start: 0,
    end: 0,
    allowedStartEntrada: 0,
    allowedEndEntrada: 0,
    allowedStartSalida: 0,
    allowedEndSalida: 0,
    earlyExit: true,
    breakStart: 0,
    breakEnd: 0,
    graceMinutes: 0
  })

  const onSubmit = async (dataInput) => {
    dispatch(Fetch_new_horario(dataInput, puntoVenta, almacenDiasSemana, userData, semana, userId, reset));
    setSemana('');
    setValoresLineaTiempo({
      start: 0,
      end: 0,
      allowedStartEntrada: 0,
      allowedEndEntrada: 0,
      allowedStartSalida: 0,
      allowedEndSalida: 0,
      earlyExit: true,
      breakStart: 0,
      breakEnd: 0,
      graceMinutes: 0
    })
  }

  const check = (e, item) => {
    if (semana == 'dias_especificos') {
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
    }
  }

  useEffect(() => {
    if (semana == 'toda_semana') {
      almacenDiasSemana = [
        { check: true, diaSemana: 'Lunes' },
        { check: true, diaSemana: 'Martes' },
        { check: true, diaSemana: 'Miércoles' },
        { check: true, diaSemana: 'Jueves' },
        { check: true, diaSemana: 'Viernes' },
        { check: true, diaSemana: 'Sábado' },
        { check: true, diaSemana: 'Domingo' }
      ]
    }
  }, [semana, onSubmit]);


  useEffect(() => {
    if (Object.keys(dataRHorario).length > 0, rHorario) {
      setRHorario(false);
    }
  }, [dataRHorario])

  useEffect(() => {
    if(puntoVenta.subMenuPuntoVenta!){
      setDataRHorario({});
    }
  }, [puntoVenta.subMenuPuntoVenta])

  return (
    <>
      <div className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser'>
        <h2>Dias con este horario</h2>
        <button className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__btnObtenerHorario'
          title='Reutilizar horario' onClick={() => setRHorario(!rHorario)}><FontAwesomeIcon icon={faClock} /></button>
        <select className='input_style' id='dia_semana' value={semana} required onChange={(e) => setSemana(e.target.value)}>
          <option>--Dias de la semana--</option>
          <option value='toda_semana'>Toda la semana</option>
          <option value='dias_especificos'>Dias específicos</option>
        </select>

        {
          semana == 'dias_especificos' ? <div className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__contcheck'>
            {
              diaSemana.map((item, i) => (<div key={i} className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__contcheck__checkDia'>
                <label htmlFor={item}>{item}</label>
                <input className='input_style' width={3} type="checkbox" onChange={(e) => check(e, item)} id={item} value={item} />
              </div>))
            }
          </div> : null
        }
        <br />
        <br />
        <WorkScheduleBar
          start={valoresLineaTiempo.start}
          end={valoresLineaTiempo.end}
          allowedStartEntrada={valoresLineaTiempo.allowedStartEntrada}
          allowedEndEntrada={valoresLineaTiempo.allowedEndEntrada}

          allowedStartSalida={valoresLineaTiempo.allowedStartSalida}
          allowedEndSalida={valoresLineaTiempo.allowedEndSalida}

          earlyExit={valoresLineaTiempo.earlyExit}
          breakStart={valoresLineaTiempo.breakStart}
          breakEnd={valoresLineaTiempo.breakEnd}
          graceMinutes={valoresLineaTiempo.graceMinutes}
        />
      </div>
      <form className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario' onSubmit={handleSubmit(onSubmit)}>
        <div className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput'>

          <h2>Nuevo horario</h2>
          <label className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__label' htmlFor='hora_entrada'>Hora de entrada</label>
          <input className='input_style' id='hora_entrada' type="time" {...register('hora_entrada', { required: true, disabled: false })} onChange={(e) => {
            setValoresLineaTiempo((prev) => ({
              ...prev,
              start: horaToDecimal(e.target.value)
            }))
          }} />

          <label className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__label'
            htmlFor='hora_valida_entrada'>Hora valida de entrada</label>
          <div className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__contDobleTime' >
            <input className='input_style' id='hora_valida_entrada' type="time" {...register('hora_valida_entrada', { required: true, disabled: false })} onChange={(e) => {
              setValoresLineaTiempo((prev) => ({
                ...prev,
                allowedStartEntrada: horaToDecimal(e.target.value)
              }))
            }} />

            <label className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__contDobleTime__label'
              htmlFor='hora_valida_entrada_hasta'>Hasta:</label>
            <input className='input_style' id='hora_valida_entrada_hasta' type="time" {...register('hora_valida_entrada_hasta', { required: true, disabled: false })} onChange={(e) => {
              setValoresLineaTiempo((prev) => ({
                ...prev,
                allowedEndEntrada: horaToDecimal(e.target.value)
              }))
            }} />
          </div>


          <label className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__label' htmlFor='hora_salida_descanso'>Hora de salida de almuerzo</label>
          <input className='input_style' id='hora_salida_descanso' type="time" {...register('hora_salida_descanso', { required: true, disabled: false })} onChange={(e) => {
            setValoresLineaTiempo((prev) => ({
              ...prev,
              breakStart: horaToDecimal(e.target.value)
            }))
          }} />

          <label className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__label' htmlFor='hora_regreso_descanso'>Hora de entrada de almuerzo</label>
          <input className='input_style' id='hora_regreso_descanso' type="time" {...register('hora_regreso_descanso', { required: true, disabled: false })} onChange={(e) => {
            setValoresLineaTiempo((prev) => ({
              ...prev,
              breakEnd: horaToDecimal(e.target.value)
            }))
          }} />

          <label className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__label' htmlFor='hora_salida'>Hora de salida</label>
          <input className='input_style' id='hora_salida' type="time" {...register('hora_salida', { required: true, disabled: false })} onChange={(e) => {
            setValoresLineaTiempo((prev) => ({
              ...prev,
              end: horaToDecimal(e.target.value)
            }))
          }} />

          <label className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__label' htmlFor='hora_valida_salida'>Hora de salida valida</label>
          <div className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__contDobleTime' >
            <input className='input_style' id='hora_valida_salida' type="time" {...register('hora_valida_salida', { required: true, disabled: false })} onChange={(e) => {
              setValoresLineaTiempo((prev) => ({
                ...prev,
                allowedStartSalida: horaToDecimal(e.target.value)
              }))
            }} />

            <label className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__contDobleTime__label' htmlFor='hora_valida_salida_hasta'>Hasta:</label>
            <input className='input_style' id='hora_valida_salida_hasta' type="time" {...register('hora_valida_salida_hasta', { required: true, disabled: false })} onChange={(e) => {
              setValoresLineaTiempo((prev) => ({
                ...prev,
                allowedEndSalida: horaToDecimal(e.target.value)
              }))
            }} />

          </div>

          <label className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__label'
            htmlFor='margen'>Margen de entrada y salida <FontAwesomeIcon title='Este es el margen de salida y entrada que tienen los usuarios para la entrada normal.'
              icon={faCircleQuestion} /></label>
          <input className='input_style' type="number" id='margen'  {...register('margen', { required: true, disabled: false })}
            onChange={(e) => {
              Number(e.target.value) > 20 ? e.target.value = '20' :
                Number(e.target.value) < 0 ? e.target.value = '0' : e.target.value == '' ? e.target.value = '0' : null;
              setValoresLineaTiempo((prev) => ({
                ...prev,
                graceMinutes: Number(e.target.value)
              }))
            }} />

          <label className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__label' htmlFor='turno'>Turno</label>
          <select className='input_style' id='turno' {...register('turno', { required: true, disabled: false })} onChange={() => setSemana('')}>
            <option value=''>--Escoge un turno--</option>
            {
              turnos.map((item, i) => (
                <option key={i} value={item}>{item}</option>
              ))
            }
          </select>

          <label className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__label' htmlFor='cargo'>Cargo</label>
          <select className='input_style' id='cargo' {...register('cargo', { required: true, disabled: false })} onChange={() => setSemana('')}>
            <option value=''>--Escoge un cargo--</option>
            {
              userCargo?.userCargo.map((item, i) => (
                <option key={i} value={item.id_cargo}>{item.nombre_cargo}</option>
              ))
            }
          </select>
          <button className='btn_style' type='submit'>Registrar</button>
        </div>
      </form>
      <RHorario active={rHorario} setDataRHorario={setDataRHorario} />
    </>
  );
}

export default FormNewHorario;