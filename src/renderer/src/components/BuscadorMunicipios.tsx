import { municipios } from "@renderer/paises/Colombia";
import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import '../css/buscadorMunicipios.css';
import { Opcion } from "@renderer/interface";

const BuscadorMunicipios = ({ seleccionado, setSeleccionado, disable = false }) => {
  const [inputValue, setInputValue] = useState("");

  const maxResultados = 50;

  const todasLasOpciones: Opcion[] = useMemo(() => {
    return municipios.map((m) => ({
      label: `${m.nombremun}, ${m.Departamento}, ${m.pais}, ${m.gentilicio}`,
      value: m.nombremun,
    }));
  }, []);

  const opcionesFiltradas = useMemo(() => {
    return todasLasOpciones
      .filter((op) =>
        op.label.toLowerCase().includes(inputValue.toLowerCase())
      )
      .slice(0, maxResultados);
  }, [inputValue, todasLasOpciones]);

  useEffect(() => {
    setSeleccionado(null);
  }, [disable == false]);

  return (
    <div className="App__dashboard__contPageOutlet__PageUsers__newUser__form__contInputs__selectMunicipio">
      <label>Lugar de nacimiento y nacionalidad</label>
      <Select
        options={opcionesFiltradas}
        value={seleccionado}
        onChange={(opcion) => setSeleccionado(opcion)}
        onInputChange={(valor) => setInputValue(valor)}
        placeholder="Lugar y nacionalidad"
        isDisabled={disable}
        isClearable
        styles={{
          control: (base, state) => ({
            ...base,
            backgroundColor: state.isDisabled ? "#333" : "#fff",
            borderColor: state.isDisabled ? "#666" : "orange",
            color: "#333",
            cursor: state.isDisabled ? "not-allowed" : "default",
            boxShadow: state.isFocused ? "0 0 0 1px orange" : "none",
            "&:hover": {
              borderColor: state.isDisabled ? "#666" : "darkorange"
            },
          }),
          singleValue: (base, state) => ({
            ...base,
            color: state.isDisabled ? "#999" : "#333",
          }),
          placeholder: (base, state) => ({
            ...base,
            color: state.isDisabled ? "#888" : "#aaa",
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "#2b2b2b",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "#3a3a3a" : "#2b2b2b",
            color: "white",
          }),
        }}
      />
    </div >
  );
};

export default BuscadorMunicipios;
