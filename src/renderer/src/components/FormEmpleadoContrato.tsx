import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { calcularFechaFinal } from '@renderer/scripts/calcularFecha';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';
import { formatearNumero } from '@renderer/scripts/formatearNumero';
import { Fetch_new_contrato } from '@renderer/actions/actionsContratos';
import { UserDataType } from '@renderer/typesTS';
import { AppDispatch } from '@renderer/store';
import '../css/formEmpleadoContrato.css';
import Alerta from './Alerta';

function FormEmpleadoContrato({ userCargo, activeNewEmpleado, empleadores, activeSubModal }) {
  const { register, handleSubmit, reset } = useForm();
  const userData = useSelector((state: UserDataType) => state.loginAccess.userLogin);
  const [date, setDate] = useState<number>(0);
  const [dateInput, setDateInput] = useState<string>('');
  const [dateFin, setDateFin] = useState<any>('');
  const [typeContrato, setTypeContrato] = useState<[string, string, string, string, string]>(['Indefinido', 'Fijo', 'Obra o Labor', 'Aprendiz SENA', 'Fijo Manejo y Confianza']);
  const [contrato, setContrato] = useState<string>('');
  const [valorSalario, setValorSalario] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: any) => state.loginAccess.userLogin.id_usuario);

  const onSubmit = async (dataInput) => {
    dispatch(Fetch_new_contrato(dataInput, userId, date, dateFin, activeNewEmpleado, userData, valorSalario, reset));
    setValorSalario('');
  }

  useEffect(() => {
    if (contrato == 'Fijo' || contrato == 'Fijo Manejo y Confianza') {
      setDateFin(calcularFechaFinal(dateInput, date))
      if (date > 12) {
        setDate(12);
      } else {
        if (date < 1) {
          setDate(1);
        }
      }
    }
  }, [date, dateInput]);

  return (
    <form className={activeSubModal && activeNewEmpleado.subMenuEmpleado ? 'App__dashboard__contPageOutlet__PageUsers__menuUser__contDataUser__contratoNotFound__active' :
      'App__dashboard__contPageOutlet__PageUsers__menuUser__contDataUser__contratoNotFound'
    }
      onSubmit={handleSubmit(onSubmit)}>
      <Alerta nameAlert='Este empleado no tiene contrato' reactiveAlert={activeSubModal} />

      <div className={'App__dashboard__contPageOutlet__PageUsers__menuUser__contDataUser__contratoNotFound__contInputs'}>
        <h2>Registrar contrato:</h2>

        <label htmlFor='tContrato'>Tipo de contrato:</label>
        <select className='input_style' id='tContrato' {...register('tContrato', { required: true, })} onChange={(e) => setContrato(e.target.value)}>
          <option value=''>--Escoge un tipo de contrato--</option>
          {
            typeContrato?.map((item, i) => (
              <option key={i} value={item}>{item}</option>
            ))
          }
        </select>
        <label htmlFor='fInicio'>Fecha inicio de contrato:</label>
        <input className='input_style' id='fInicio' type="date" {...register('fInicio', { required: true, })} placeholder='Fecha de inicio'
          onChange={(e) => setDateInput(e.target.value)} />
        {
          contrato == 'Fijo' || contrato == 'Fijo Manejo y Confianza' ? <>
            <label htmlFor='fFin'>Fecha finalización de contrato</label>
            <input className='input_style' id='fFin' type="date" {...register('fFin', { required: true, disabled: true })} placeholder='Fecha de fin' value={dateFin} />
          </> : null
        }
        {
          contrato == 'Fijo' || contrato == 'Fijo Manejo y Confianza' ? <>
            <div className='App__dashboard__contPageOutlet__PageUsers__menuUser__contDataUser__contratoNotFound__contInputs__contBtn'>
              <label htmlFor='meses'>Meses del contrato:</label>
              <span><FontAwesomeIcon onClick={() => setDate(date + 1)} icon={faChevronCircleUp} /></span>
              <span>{date}</span>
              <span><FontAwesomeIcon onClick={() => setDate(date - 1)} icon={faChevronCircleDown} /></span>
            </div>
          </> : null
        }
        <label htmlFor='estado'>Estado:</label>
        <select className='input_style' id='estado' {...register('estado', { required: true, })}>
          <option value='Activo'>Activo</option>
        </select>

        <label htmlFor='salario'>Salario:</label>
        <input className='input_style' id='salario' type="text" {...register('salario', { required: true, })} value={valorSalario}
          onChange={(e) => setValorSalario(formatearNumero(e.target.value))} placeholder='Salario' />
        <label htmlFor='cargo'>Cargo:</label>

        <select className='input_style' id='cargo' {...register('cargo', { required: true, })}>
          <option value=''>--Escoge un cargo--</option>
          {
            userCargo?.map((item, i) => (
              <option key={i} value={item.id_cargo}>{item.nombre_cargo}</option>
            ))
          }
        </select>
        <label htmlFor='empleador'>Empleador:</label>
        <select className='input_style' id='empleador' {...register('empleador', { required: true, })}>
          <option value=''>--Escoge un empleador--</option>
          {
            empleadores?.map((item, i) => (
              <option key={i} value={item.id_empleador}>{item.nombre_empleador}</option>
            ))
          }
        </select>
        <button className='btn_style' type='submit'>Registrar</button>
      </div>
    </form>
  );
}

export default FormEmpleadoContrato;