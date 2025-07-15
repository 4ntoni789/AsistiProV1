import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import SwitchButtonEdit from './SwitchButtonEdit';
import { ActiveErrorSpam, ActiveSubMenuPuntoVenta } from '@renderer/actions/actionsLogin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { WorkScheduleBar } from './WorkScheduleBar';
import { Props } from '@renderer/typesTS';
import { horaToDecimal } from '@renderer/scripts/horaDecimal';


function FormNewHorario(userCargo) {
  const puntoVenta = useSelector((state: any) => state.menuAccions.subMenuPuntoVenta);
  const [activeEdition, setActiveEdition] = useState(true);
  const { register, handleSubmit, reset } = useForm();
  const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const dispatch = useDispatch();
  const turnos = [1, 2, 3, 4];
  const diaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const [semana, setSemana] = useState<string>('');
  let almacenDiasSemana: any = [];
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);

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
    if (semana == 'dias_especificos' || semana == 'toda_semana') {
      if (almacenDiasSemana.length > 0) {
        try {
          const response = await fetch(`/api/horario`, {
            method: 'POST',
            headers: {
              'x-id-usuario': userId,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              hora_entrada: dataInput.hora_entrada,
              hora_valida_entrada: dataInput.hora_valida_entrada,
              hora_valida_entrada_hasta:dataInput.hora_valida_entrada_hasta,
              hora_salida_descanso: dataInput.hora_salida_descanso,
              hora_regreso_descanso: dataInput.hora_regreso_descanso,
              hora_salida: dataInput.hora_salida,
              hora_valida_salida: dataInput.hora_valida_salida,
              hora_valida_salida_hasta: dataInput.hora_valida_salida_hasta,
              margen: dataInput.margen,
              turno: dataInput.turno,
              cargo: dataInput.cargo,
              semana: almacenDiasSemana,
              id_pv: puntoVenta.user.item.id_pv,
              reqUser: userData
            }),
          });
          const result = await response.json();
          if (response.ok) {
            dispatch(ActiveSubMenuPuntoVenta({ user: {}, subMenuPuntoVenta: false }));
            dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'submit' }));
            reset();
          } else {
            dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'error' }));
            throw new Error(result.message);
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        dispatch(ActiveErrorSpam({ msg: 'Seleciona los dias que este horario va a tener', active: true, typeError: 'error' }));
      }
    } else {
      dispatch(ActiveErrorSpam({ msg: 'Seleciona los dias que este horario va a tener', active: true, typeError: 'error' }));
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
    console.log(valoresLineaTiempo);
  }, [valoresLineaTiempo])

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

  return (
    <>
      <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__dataUser'>
        <h2>Dias con este horario</h2>
        <select id='dia_semana' value={semana} required disabled={activeEdition} onChange={(e) => setSemana(e.target.value)}>
          <option>--Escoge una opción--</option>
          <option value='toda_semana'>Toda la semana</option>
          <option value='dias_especificos'>Dias específicos</option>
        </select>

        {
          semana == 'dias_especificos' && activeEdition == !true ? <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__dataUser__contcheck'>
            {
              diaSemana.map((item, i) => (<div key={i} className='App__dashboard__contPageOutlet__PageUsers__newUser__form__dataUser__contcheck__checkDia'>
                <label htmlFor={item}>{item}</label>
                <input width={3} type="checkbox" onChange={(e) => check(e, item)} id={item} value={item} />
              </div>))
            }
          </div> : null
        }
        {
          !activeEdition ? <WorkScheduleBar
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
          /> : null
        }
      </div>
      <form className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contratoNotFound' onSubmit={handleSubmit(onSubmit)}>
        <br />
        <br />
        <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contratoNotFound__contInputs__check'>
          <label htmlFor="">Registrar horario:</label>
          <SwitchButtonEdit activeEdition={activeEdition} setActiveEdition={() => setActiveEdition(!activeEdition)} />
        </div>
        <div className={!activeEdition ? 'App__dashboard__contPageOutlet__PageUsers__newUser__form__contratoNotFound__contInputs__active' : 'App__dashboard__contPageOutlet__PageUsers__newUser__form__contratoNotFound__contInputs'}>
          <br />
          <label htmlFor='hora_entrada'>Hora de entrada</label>
          <input id='hora_entrada' type="time" {...register('hora_entrada', { required: true, disabled: activeEdition })} onChange={(e) => {
            setValoresLineaTiempo((prev) => ({
              ...prev,
              start: horaToDecimal(e.target.value)
            }))
          }} />

          <label htmlFor='hora_valida_entrada'>Hora valida de entrada</label>
          <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contratoNotFound__contInputs__contDobleTime' >
            <input id='hora_valida_entrada' type="time" {...register('hora_valida_entrada', { required: true, disabled: activeEdition })} onChange={(e) => {
              setValoresLineaTiempo((prev) => ({
                ...prev,
                allowedStartEntrada: horaToDecimal(e.target.value)
              }))
            }} />

            <label htmlFor='hora_valida_entrada_hasta'>Hasta:</label>
            <input id='hora_valida_entrada_hasta' type="time" {...register('hora_valida_entrada_hasta', { required: true, disabled: activeEdition })} onChange={(e) => {
              setValoresLineaTiempo((prev) => ({
                ...prev,
                allowedEndEntrada: horaToDecimal(e.target.value)
              }))
            }} />
          </div>


          <label htmlFor='hora_salida_descanso'>Hora de salida de almuerzo</label>
          <input id='hora_salida_descanso' type="time" {...register('hora_salida_descanso', { required: true, disabled: activeEdition })} onChange={(e) => {
            setValoresLineaTiempo((prev) => ({
              ...prev,
              breakStart: horaToDecimal(e.target.value)
            }))
          }} />

          <label htmlFor='hora_regreso_descanso'>Hora de entrada de almuerzo</label>
          <input id='hora_regreso_descanso' type="time" {...register('hora_regreso_descanso', { required: true, disabled: activeEdition })} onChange={(e) => {
            setValoresLineaTiempo((prev) => ({
              ...prev,
              breakEnd: horaToDecimal(e.target.value)
            }))
          }} />

          <label htmlFor='hora_salida'>Hora de salida</label>
          <input id='hora_salida' type="time" {...register('hora_salida', { required: true, disabled: activeEdition })} onChange={(e) => {
            setValoresLineaTiempo((prev) => ({
              ...prev,
              end: horaToDecimal(e.target.value)
            }))
          }} />

          <label htmlFor='hora_valida_salida'>Hora de salida valida</label>
          <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contratoNotFound__contInputs__contDobleTime' >
            <input id='hora_valida_salida' type="time" {...register('hora_valida_salida', { required: true, disabled: activeEdition })} onChange={(e) => {
              setValoresLineaTiempo((prev) => ({
                ...prev,
                allowedStartSalida: horaToDecimal(e.target.value)
              }))
            }} />

            <label htmlFor='hora_valida_salida_hasta'>Hasta:</label>
            <input id='hora_valida_salida_hasta' type="time" {...register('hora_valida_salida_hasta', { required: true, disabled: activeEdition })} onChange={(e) => {
              setValoresLineaTiempo((prev) => ({
                ...prev,
                allowedEndSalida: horaToDecimal(e.target.value)
              }))
            }} />

          </div>

          <label htmlFor='margen'>Margen de entrada y salida <FontAwesomeIcon title='Este es el margen de salida y entrada que tienen los usuarios para la entrada normal.'
            icon={faCircleQuestion} /></label>
          <input type="number" id='margen'  {...register('margen', { required: true, disabled: activeEdition, value: 10 })}
            onChange={(e) => {
              Number(e.target.value) > 20 ? e.target.value = '20' :
                Number(e.target.value) < 0 ? e.target.value = '0' : e.target.value == '' ? e.target.value = '0' : null;
              setValoresLineaTiempo((prev) => ({
                ...prev,
                graceMinutes: Number(e.target.value)
              }))
            }} />

          <label htmlFor='turno'>Turno</label>
          <select id='turno' {...register('turno', { required: true, disabled: activeEdition })} onChange={() => setSemana('')}>
            <option value=''>--Escoge un turno--</option>
            {
              turnos.map((item, i) => (
                <option key={i} value={item}>{item}</option>
              ))
            }
          </select>

          <label htmlFor='cargo'>cargo</label>
          <select id='cargo' {...register('cargo', { required: true, disabled: activeEdition })} onChange={() => setSemana('')}>
            <option value=''>--Escoge un cargo--</option>
            {
              userCargo?.userCargo.map((item, i) => (
                <option key={i} value={item.id_cargo}>{item.nombre_cargo}</option>
              ))
            }
          </select>
          <button type='submit' disabled={activeEdition}>Registrar</button>
        </div>
      </form>
    </>
  );
}

export default FormNewHorario;