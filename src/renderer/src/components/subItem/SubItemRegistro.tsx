import React from 'react'
import '../../css/itemRegistro.css';

function ItemRegistro({ registro, pVenta }) {
    return (
        <div className={registro.tipo == 'Desconocida' || registro.tipo == 'fuera de horario'  ? 'App__init__contTable__tablaMarcaciones__modalRegistros__active__subModal__body__contItemRegistro__error' :
            registro.tipo == 'Entrada normal' || registro.tipo == 'Salida de almuerzo' || registro.tipo == 'Entrada de almuerzo' || registro.tipo == 'Entrada temprano'
                || registro.tipo == 'Salida'
                ?
                'App__init__contTable__tablaMarcaciones__modalRegistros__active__subModal__body__contItemRegistro__normal' :
                'App__init__contTable__tablaMarcaciones__modalRegistros__active__subModal__body__contItemRegistro'}>
            <div className='App__init__contTable__tablaMarcaciones__modalRegistros__active__subModal__body__contItemRegistro__textRegistro'>
                <h5>{pVenta}</h5>
                <h5>{registro.hora}</h5>
                <h5>{registro.tipo}</h5>
                <h5>{registro.turno}</h5>
            </div>
        </div >
    )
}

export default ItemRegistro;