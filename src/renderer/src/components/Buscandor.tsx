import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Buscandor({ searchTerm, handleSearch }) {
    return (
        <div className="App__init__contTable__tablaMarcaciones__header__search-container">
            <span className="App__init__contTable__tablaMarcaciones__header__search-container__search-icon"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
            <input type="search" className="App__init__contTable__tablaMarcaciones__header__search-container__search-input" value={searchTerm}
                onChange={handleSearch}
                placeholder="Buscar por nombre o por id..." />
        </div>
    )
}

export default Buscandor
