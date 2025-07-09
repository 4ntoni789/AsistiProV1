import React, { useEffect, useRef, useState } from 'react';
import SwitchButtonEdit from './SwitchButtonEdit';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { calcularFechaFinal } from '@renderer/scripts/calcularFecha';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';
import { ActiveErrorSpam, ActiveSubMenuEmpleado } from '@renderer/actions/actionsLogin';
import { formatearNumero } from '@renderer/scripts/formatearNumero';
import { limpiarNumero } from '@renderer/scripts/limpiarNumero';

function FormEmpleadoContrato({ activeEdition, setActiveEdition, userCargo, activeNewEmpleado, empleadores }) {
  const { register, handleSubmit, reset } = useForm();
  const userData = useSelector((state: any) => state.loginAccess.userLogin);
  const [date, setDate] = useState<number>(1);
  const [dateInput, setDateInput] = useState<string>('');
  const [dateFin, setDateFin] = useState<any>('');
  const [typeContrato, setTypeContrato] = useState<[string, string, string, string]>(['Indefinido', 'Fijo', 'Obra o Labor', 'Aprendiz SENA']);
  const [contrato, setContrato] = useState<string>('');
  const [valorSalario, setValorSalario] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);

  const onSubmit = async (dataInput) => {
    try {
      const response = await fetch(`/api/contrato`, {
        method: 'POST',
        headers: {
          'x-id-usuario': userId,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tipo_contrato: dataInput.tContrato,
          fecha_inicio: dataInput.fInicio,
          fecha_fin: dataInput.tContrato == 'Fijo' ? dateFin : null,
          meses: date,
          cantidad_prorrogas: 0,
          estado: dataInput.estado,
          id_empleado: activeNewEmpleado.user.id_empleado,
          id_cargo: dataInput.cargo,
          salario: limpiarNumero(valorSalario),
          empleador: dataInput.empleador,
          reqUser: userData
        }),
      });

      const result = await response.json();
      if (response.ok) {
        dispatch(ActiveSubMenuEmpleado({ user: {}, subMenuEmpleado: false }));
        dispatch(ActiveErrorSpam({ msg: result.message, active: true, typeError: 'submit' }));
      } else {
        dispatch(ActiveErrorSpam({ msg: result.error, active: true, typeError: 'error' }));
        throw new Error(result.error);
      }
    } catch (error) {
      console.log('Ocurrió un error al crear este contrato');
    }
  }

  useEffect(() => {
    if (activeEdition == false && contrato == 'Fijo') {
      setDateFin(calcularFechaFinal(dateInput, date))
      if (date > 12) {
        setDate(12);
      } else {
        if (date < 1) {
          setDate(1);
        }
      }
    }
  }, [date, dateInput])

  return (
    <form className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contratoNotFound' onSubmit={handleSubmit(onSubmit)}>
      <h2>Este usuario no tiene contrato</h2>
      <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contratoNotFound__contInputs__check'>
        <label htmlFor="">Registrar contrato:</label>
        <SwitchButtonEdit activeEdition={activeEdition} setActiveEdition={() => setActiveEdition(!activeEdition)} />
      </div>
      <div className={!activeEdition ? 'App__dashboard__contPageOutlet__PageUsers__newUser__form__contratoNotFound__contInputs__active' : 'App__dashboard__contPageOutlet__PageUsers__newUser__form__contratoNotFound__contInputs'}>
        <br />
        <label htmlFor='tContrato'>Tipo de contrato</label>
        <select id='tContrato' {...register('tContrato', { required: true, disabled: activeEdition })} onChange={(e) => setContrato(e.target.value)}>
          <option value=''>--Escoge un tipo de contrato--</option>
          {
            typeContrato?.map((item, i) => (
              <option key={i} value={item}>{item}</option>
            ))
          }
        </select>
        <label htmlFor='fInicio'>Fecha inicio de contrato</label>
        <input id='fInicio' type="date" {...register('fInicio', { required: true, disabled: activeEdition })} placeholder='Fecha de inicio'
          onChange={(e) => setDateInput(e.target.value)} />
        {
          contrato == 'Fijo' ? <>
            <label htmlFor='fFin'>Fecha finalización de contrato</label>
            <input id='fFin' type="date" {...register('fFin', { required: true, disabled: true })} placeholder='Fecha de fin' value={dateFin} />
          </> : null
        }
        {
          contrato == 'Fijo' ? <>
            <label htmlFor='meses'>Meses del contrato</label>
            <div className='App__dashboard__contPageOutlet__PageUsers__newUser__form__contratoNotFound__contInputs__contBtn'>
              <span><FontAwesomeIcon onClick={() => setDate(date + 1)} icon={faChevronCircleUp} /></span>
              <span>{date}</span>
              <span><FontAwesomeIcon onClick={() => setDate(date - 1)} icon={faChevronCircleDown} /></span>
            </div>
          </> : null
        }
        <label htmlFor='estado'>Estado</label>
        <select id='estado' {...register('estado', { required: true, disabled: activeEdition })}>
          <option value='Activo'>Activo</option>
        </select>
        <label htmlFor='salario'>Salario</label>
        <input id='salario' type="text" {...register('salario', { required: true, disabled: activeEdition })} value={valorSalario}
          onChange={(e) => setValorSalario(formatearNumero(e.target.value))} placeholder='Salario' />
        <label htmlFor='cargo'>Cargo</label>
        <select id='cargo' {...register('cargo', { required: true, disabled: activeEdition })}>
          <option value=''>--Escoge un cargo--</option>
          {
            userCargo?.map((item, i) => (
              <option key={i} value={item.id_cargo}>{item.nombre_cargo}</option>
            ))
          }
        </select>
        <label htmlFor='empleador'>Empleador</label>
        <select id='empledaor' {...register('empleador', { required: true, disabled: activeEdition })}>
          <option value=''>--Escoge un empleador--</option>
          {
            empleadores?.map((item, i) => (
              <option key={i} value={item.id_empleador}>{item.nombre_empleador}</option>
            ))
          }
        </select>
        <button type='submit' disabled={activeEdition}>Registrar</button>
      </div>
    </form>
  );
}

export default FormEmpleadoContrato;