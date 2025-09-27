import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBusinessTime, faCircleQuestion, faClock, faDoorOpen, faGears, faRotate } from '@fortawesome/free-solid-svg-icons';
import { WorkScheduleBar } from './WorkScheduleBar';
import { Props, UserDataType } from '@renderer/typesTS';
import { horaToDecimal } from '@renderer/scripts/horaDecimal';
import { Fetch_new_horario } from '@renderer/actions/actionsHorario';
import { AppDispatch } from '@renderer/store';
import RHorario from './RHorario';
import { extraerHora } from '@renderer/scripts/extraerHora';
import { horaToDecimalSinCero } from '@renderer/scripts/horaDecimalSinCero';
import LoadingBtn from './LoadingBtn';

function FormNewHorario(userCargo) {
  const puntoVenta = useSelector((state: any) => state.menuAccions.subMenuPuntoVenta);
  const { register, handleSubmit, reset, setValue } = useForm();
  const userData = useSelector((state: UserDataType) => state.loginAccess.userLogin);
  const dispatch = useDispatch<AppDispatch>();
  const turnos = [1, 2, 3, 4];
  const diaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const [semana, setSemana] = useState<string>('');
  let almacenDiasSemana: any = [];
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);
  const [rHorario, setRHorario] = useState<boolean>(false);
  const [dataRHorario, setDataRHorario] = useState<any>({});
  const [habilitarDescanso, setHabilitarDescanso] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [valoresLineaTiempo, setValoresLineaTiempo] = useState<Props>({
    start: 0,
    end: 0,
    allowedStartEntrada: 0,
    allowedEndEntrada: 0,
    allowedStartSalida: 0,
    allowedEndSalida: 0,
    earlyExit: true,
    breakStart: 0,
    salidaValidaDescanso: 0,
    salidaValidaDescansoHasta: 0,
    breakEnd: 0,
    entradaValidaDescanso: 0,
    entradaValidaDescansoHasta: 0,
    graceMinutes: 0
  })

  const onSubmit = async (dataInput) => {
    if (semana) {
      dispatch(Fetch_new_horario(dataInput, puntoVenta, almacenDiasSemana, userData, semana, userId, habilitarDescanso, reset, setLoading));
      setSemana('');
    }
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
      setValue('hora_entrada', extraerHora(dataRHorario.hora_entrada));
      setValue('hora_valida_entrada', extraerHora(dataRHorario.hora_valida_entrada));
      setValue('hora_valida_entrada_hasta', extraerHora(dataRHorario.hora_valida_entrada_hasta));

      if (dataRHorario.hora_salida_descanso != null && dataRHorario.hora_salida_descanso != undefined) {
        setHabilitarDescanso(true);
        setValue('hora_salida_descanso', extraerHora(dataRHorario.hora_salida_descanso));
        setValue('hora_valida_salida_descanso', extraerHora(dataRHorario.hora_valida_salida_descanso));
        setValue('hora_valida_salida_descanso_hasta', extraerHora(dataRHorario.hora_valida_salida_descanso_hasta));

        setValue('hora_regreso_descanso', extraerHora(dataRHorario.hora_regreso_descanso));
        setValue('hora_valida_regreso_descanso', extraerHora(dataRHorario.hora_valida_regreso_descanso));
        setValue('hora_valida_regreso_descanso_hasta', extraerHora(dataRHorario.hora_valida_regreso_descanso_hasta));
      }

      setValue('hora_salida', extraerHora(dataRHorario.hora_salida));
      setValue('hora_valida_salida', extraerHora(dataRHorario.hora_valida_salida));
      setValue('hora_valida_salida_hasta', extraerHora(dataRHorario.hora_valida_salida_hasta));

      setValue('margen', dataRHorario.margen);
      setValue('turno', dataRHorario.turno);
      setValue('cargo', dataRHorario.id_cargo);

      setValoresLineaTiempo({
        start: horaToDecimal(extraerHora(dataRHorario?.hora_entrada)),
        end: horaToDecimal(extraerHora(dataRHorario.hora_salida)),
        allowedStartEntrada: horaToDecimal(extraerHora(dataRHorario.hora_valida_entrada)),
        allowedStartSalida: horaToDecimal(extraerHora(dataRHorario.hora_valida_entrada_hasta)),
        allowedEndEntrada: horaToDecimal(extraerHora(dataRHorario.hora_valida_salida)),
        allowedEndSalida: horaToDecimal(extraerHora(dataRHorario.hora_valida_salida_hasta)),
        earlyExit: true,
        breakStart: horaToDecimal(extraerHora(dataRHorario.hora_salida_descanso)),
        salidaValidaDescanso: horaToDecimal(extraerHora(dataRHorario.hora_valida_salida_descanso)),
        salidaValidaDescansoHasta: horaToDecimal(extraerHora(dataRHorario.hora_valida_salida_descanso_hasta)),
        breakEnd: horaToDecimal(extraerHora(dataRHorario.hora_regreso_descanso)),
        entradaValidaDescanso: horaToDecimal(extraerHora(dataRHorario.hora_valida_regreso_descanso)),
        entradaValidaDescansoHasta: horaToDecimal(extraerHora(dataRHorario.hora_valida_regreso_descanso_hasta)),
        graceMinutes: dataRHorario.margen
      })

    }
  }, [dataRHorario])

  useEffect(() => {
    if (puntoVenta.subMenuPuntoVenta!) {
      setDataRHorario({});
      reset();
      setHabilitarDescanso(false);
      setValoresLineaTiempo({
        start: 0,
        end: 0,
        allowedStartEntrada: 0,
        allowedEndEntrada: 0,
        allowedStartSalida: 0,
        allowedEndSalida: 0,
        earlyExit: true,
        breakStart: 0,
        salidaValidaDescanso: 0,
        salidaValidaDescansoHasta: 0,
        breakEnd: 0,
        entradaValidaDescanso: 0,
        entradaValidaDescansoHasta: 0,
        graceMinutes: 0
      })
    }
  }, [puntoVenta.subMenuPuntoVenta])

  return (
    <>
      <div className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser'>
        <h2>Dias con este horario</h2>
        <button className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__btnObtenerHorario'
          tabIndex={puntoVenta.subMenuPuntoVenta ? 1 : -1}
          title='Reutilizar horario' onClick={() => setRHorario(!rHorario)}>{
            rHorario ?
              <div className='rotate' title='Esperando horario...'>
                < FontAwesomeIcon icon={faRotate} />
              </div>
              :
              < FontAwesomeIcon icon={faClock} />
          }</button>
        <select className='input_style' id='dia_semana' value={semana} required onChange={(e) => setSemana(e.target.value)}
          tabIndex={puntoVenta.subMenuPuntoVenta ? 2 : -1}>
          <option>--Dias de la semana--</option>
          <option value='toda_semana'>Toda la semana</option>
          <option value='dias_especificos'>Dias específicos</option>
        </select>

        {
          semana == 'dias_especificos' ? <div className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__contcheck'>
            {
              diaSemana.map((item, i) => (<div key={i} className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__contcheck__checkDia'>
                <label htmlFor={item}>{item}</label>
                <input className='input_style' width={3} tabIndex={-1} type="checkbox" onChange={(e) => check(e, item)} id={item} value={item} />
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
          salidaValidaDescanso={valoresLineaTiempo.salidaValidaDescanso}
          salidaValidaDescansoHasta={valoresLineaTiempo.salidaValidaDescansoHasta}
          entradaValidaDescanso={valoresLineaTiempo.entradaValidaDescanso}
          entradaValidaDescansoHasta={valoresLineaTiempo.entradaValidaDescansoHasta}
        />
      </div>
      <form className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario' onSubmit={handleSubmit(onSubmit)}>
        <div className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput'>

          <h2>Nuevo horario</h2>
          <div className='separador'>
            <FontAwesomeIcon className='separador__icon' icon={faDoorOpen} />
            <label className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__label' htmlFor='hora_entrada'>Hora de entrada</label>
            <input className='input_style' id='hora_entrada' type="time" {...register('hora_entrada', { required: true, disabled: false })} onChange={(e) => {
              setValoresLineaTiempo((prev) => ({
                ...prev,
                start: horaToDecimal(e.target.value)
              }))
            }}
              tabIndex={puntoVenta.subMenuPuntoVenta ? 3 : -1}
            />

            <label className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__label'
              htmlFor='hora_valida_entrada'>Hora valida de entrada</label>
            <div className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__contDobleTime' >
              <input className='input_style' id='hora_valida_entrada' type="time" {...register('hora_valida_entrada', { required: true, disabled: false })} onChange={(e) => {
                setValoresLineaTiempo((prev) => ({
                  ...prev,
                  allowedStartEntrada: horaToDecimal(e.target.value)
                }))
              }}
                tabIndex={puntoVenta.subMenuPuntoVenta ? 4 : -1}
              />

              <label className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__contDobleTime__label'
                htmlFor='hora_valida_entrada_hasta'>Hasta:</label>
              <input className='input_style' id='hora_valida_entrada_hasta' type="time" {...register('hora_valida_entrada_hasta', { required: true, disabled: false })} onChange={(e) => {
                setValoresLineaTiempo((prev) => ({
                  ...prev,
                  allowedEndEntrada: horaToDecimal(e.target.value)
                }))
              }}
                tabIndex={puntoVenta.subMenuPuntoVenta ? 5 : -1}
              />
            </div>
          </div>
          {/* //SEPARADOR */}
          <div className='separador'>
            <FontAwesomeIcon className='separador__icon' icon={faBell} />
            <div className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__contcheck' >
              <label className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__contcheck__label'
                htmlFor='check_descanso'>Habilitar descanso:</label>
              <input title='Habilitar descanso'
                className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__contcheck__input'
                id='check_descanso' type="checkbox" checked={habilitarDescanso} {...register('check_descanso', { required: false, disabled: false })}
                onChange={() => setHabilitarDescanso(!habilitarDescanso)}
                tabIndex={-1}
              />
            </div >

            {
              habilitarDescanso === true ? <>
                <label className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__label'
                  htmlFor='hora_salida_descanso'>Hora de salida de almuerzo</label>
                <input className='input_style' id='hora_salida_descanso' type="time"
                  {...register('hora_salida_descanso', { required: true, disabled: false })} onChange={(e) => {
                    setValoresLineaTiempo((prev) => ({
                      ...prev,
                      breakStart: horaToDecimalSinCero(e.target.value)
                    }))
                  }}
                />

                <label className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__label'
                  htmlFor='hora_valida_salida_descanso'>Hora valida de salida descanso</label>
                <div className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__contDobleTime' >
                  <input className='input_style' id='hora_valida_salida_descanso' type="time" {...register('hora_valida_salida_descanso', { required: true, disabled: false })} onChange={(e) => {
                    setValoresLineaTiempo((prev) => ({
                      ...prev,
                      salidaValidaDescanso: horaToDecimal(e.target.value)
                    }))
                  }} />

                  <label className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__contDobleTime__label'
                    htmlFor='hora_valida_salida_descanso_hasta'>Hasta:</label>
                  <input className='input_style' id='hora_valida_salida_descanso_hasta' type="time" {...register('hora_valida_salida_descanso_hasta', { required: true, disabled: false })} onChange={(e) => {
                    setValoresLineaTiempo((prev) => ({
                      ...prev,
                      salidaValidaDescansoHasta: horaToDecimal(e.target.value)
                    }))
                  }} />
                </div>


                <label className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__label'
                  htmlFor='hora_regreso_descanso'>Hora de entrada de almuerzo</label>
                <input className='input_style' id='hora_regreso_descanso' type="time" {...register('hora_regreso_descanso', { required: true, disabled: false })} onChange={(e) => {
                  setValoresLineaTiempo((prev) => ({
                    ...prev,
                    breakEnd: horaToDecimalSinCero(e.target.value)
                  }))
                }} />

                <label className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__label'
                  htmlFor='hora_valida_regreso_descanso'>Hora valida de entrada descanso</label>
                <div className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__contDobleTime' >
                  <input className='input_style' id='hora_valida_regreso_descanso' type="time" {...register('hora_valida_regreso_descanso', { required: true, disabled: false })} onChange={(e) => {
                    setValoresLineaTiempo((prev) => ({
                      ...prev,
                      entradaValidaDescanso: horaToDecimal(e.target.value)
                    }))
                  }} />

                  <label className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__contDobleTime__label'
                    htmlFor='hora_valida_regreso_descanso_hasta'>Hasta:</label>
                  <input className='input_style' id='hora_valida_regreso_descanso_hasta' type="time" {...register('hora_valida_regreso_descanso_hasta', { required: true, disabled: false })} onChange={(e) => {
                    setValoresLineaTiempo((prev) => ({
                      ...prev,
                      entradaValidaDescansoHasta: horaToDecimal(e.target.value)
                    }))
                  }} />
                </div>

              </> : null
            }
          </div>
          {/* /SEPARADOR */}
          {/* /SEPARADOR */}

          <div className='separador'>
            <FontAwesomeIcon className='separador__icon' icon={faBusinessTime} />
            <label className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__label'
              htmlFor='hora_salida'>Hora de salida</label>
            <input className='input_style' id='hora_salida' type="time" {...register('hora_salida', { required: true, disabled: false })} onChange={(e) => {
              setValoresLineaTiempo((prev) => ({
                ...prev,
                end: horaToDecimal(e.target.value)
              }))
            }}
              tabIndex={puntoVenta.subMenuPuntoVenta ? 6 : -1}
            />

            <label className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__label' htmlFor='hora_valida_salida'>Hora de salida valida</label>
            <div className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__contDobleTime' >
              <input className='input_style' id='hora_valida_salida' type="time" {...register('hora_valida_salida', { required: true, disabled: false })} onChange={(e) => {
                setValoresLineaTiempo((prev) => ({
                  ...prev,
                  allowedStartSalida: horaToDecimal(e.target.value)
                }))
              }}
                tabIndex={puntoVenta.subMenuPuntoVenta ? 7 : -1}
              />

              <label className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__contDobleTime__label' htmlFor='hora_valida_salida_hasta'>Hasta:</label>
              <input className='input_style' id='hora_valida_salida_hasta' type="time" {...register('hora_valida_salida_hasta', { required: true, disabled: false })} onChange={(e) => {
                setValoresLineaTiempo((prev) => ({
                  ...prev,
                  allowedEndSalida: horaToDecimal(e.target.value)
                }))
              }}
                tabIndex={puntoVenta.subMenuPuntoVenta ? 8 : -1}
              />

            </div>
          </div>

          <div className='separador'>
            <FontAwesomeIcon className='separador__icon' icon={faGears} />
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
              }}
              tabIndex={puntoVenta.subMenuPuntoVenta ? 9 : -1}
            />

            <label className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__label' htmlFor='turno'>Turno</label>
            <select className='input_style' id='turno' {...register('turno', { required: true, disabled: false })} onChange={() => setSemana('')}
              tabIndex={puntoVenta.subMenuPuntoVenta ? 10 : -1}
            >
              <option value=''>--Escoge un turno--</option>
              {
                turnos.map((item, i) => (
                  <option key={i} value={item}>{item}</option>
                ))
              }
            </select>

            <label className='App__dashboard__contPageOutlet__PageUsers__menuVerPuntoVenta__newHorario__dataUser__formNewHorario__contInput__label' htmlFor='cargo'>Cargo</label>
            <select className='input_style' id='cargo' {...register('cargo', { required: true, disabled: false })} onChange={() => setSemana('')}
              tabIndex={puntoVenta.subMenuPuntoVenta ? 11 : -1}
            >
              <option value=''>--Escoge un cargo--</option>
              {
                userCargo?.userCargo == undefined ? null :
                  userCargo?.userCargo.map((item, i) => (
                    <option key={i} value={item.id_cargo}>{item.nombre_cargo}</option>
                  ))
              }
            </select>
          </div>
          <LoadingBtn loading={loading} activeTabIndex={puntoVenta.subMenuPuntoVenta} tabInd={10} textBtn='Registrar'/>
        </div>
      </form>
      <RHorario active={rHorario} setDataRHorario={setDataRHorario} />
    </>
  );
}

export default FormNewHorario;