import React, { useEffect, useRef, useState } from "react";
import type { UseFormRegister, UseFormSetValue } from "react-hook-form";
import '../css/visualSixInputsVerifyCode.css';

type Props = {
    name: string; // nombre del campo en react-hook-form (ej: 'codigo_recuperacion')
    setValue: any;
    length?: number; // por defecto 6
    autoFocus?: boolean;
    disabled?: boolean;
};

const VisualSixInputsVerifyCode: React.FC<Props> = ({
    name,
    setValue,
    length = 6,
    autoFocus = true,
    disabled = false,
}) => {

    // estado visual por casilla
    const [vals, setVals] = useState<string[]>(() => Array(length).fill(""));
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    // registrar el campo oculto en R-H-F (no usamos input hidden; registramos para que R-H-F conozca el nombre)

    // sincronizar con react-hook-form cada vez que cambian los dígitos
    useEffect(() => {
        const joined = vals.join("");
        setValue(joined);
    }, [vals.join("")]); // solo cuando cambia el string concatenado

    // foco inicial
    useEffect(() => {
        if (autoFocus && !disabled) {
            inputsRef.current[0]?.focus();
            inputsRef.current[0]?.select();
        }
    }, [autoFocus, disabled]);

    const setAt = (index: number, char: string) => {
        setVals((prev) => {
            const next = [...prev];
            next[index] = char;
            return next;
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        if (disabled) return;
        const raw = e.target.value || "";
        const digit = raw.replace(/\D/g, "").slice(-1); // solo último dígito numérico
        setAt(idx, digit);

        if (digit && idx < length - 1) {
            inputsRef.current[idx + 1]?.focus();
            inputsRef.current[idx + 1]?.select();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
        if (disabled) return;
        const key = e.key;

        if (key === "Backspace") {
            e.preventDefault();
            if (vals[idx]) {
                // limpiar casilla actual
                setAt(idx, "");
                inputsRef.current[idx]!.value = "";
                return;
            }
            // si está vacía, mover al anterior
            if (idx > 0) {
                inputsRef.current[idx - 1]?.focus();
                setAt(idx - 1, "");
                if (inputsRef.current[idx - 1]) inputsRef.current[idx - 1]!.value = "";
            }
            return;
        }

        if (key === "ArrowLeft" && idx > 0) {
            e.preventDefault();
            inputsRef.current[idx - 1]?.focus();
            return;
        }

        if (key === "ArrowRight" && idx < length - 1) {
            e.preventDefault();
            inputsRef.current[idx + 1]?.focus();
            return;
        }

        // bloquear entrada de caracteres no numéricos
        if (key.length === 1 && !/^\d$/.test(key)) {
            e.preventDefault();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, idx: number) => {
        if (disabled) return;
        e.preventDefault();
        const text = e.clipboardData.getData("text").replace(/\s/g, "");
        const digits = text.replace(/\D/g, "");
        if (!digits) return;

        setVals((prev) => {
            const next = [...prev];
            for (let i = 0; i < digits.length && idx + i < length; i++) {
                next[idx + i] = digits[i];
                // actualizar el value del input para evitar inconsistencia visual
                if (inputsRef.current[idx + i]) inputsRef.current[idx + i]!.value = digits[i];
            }
            return next;
        });

        const finalIndex = Math.min(length - 1, idx + digits.length - 1);
        inputsRef.current[finalIndex]?.focus();
        inputsRef.current[finalIndex]?.select();
    };



    return (
        <div className={disabled ? 'VisualSixInputsVerifyCode':'VisualSixInputsVerifyCode__active'}>
            {Array.from({ length }).map((_, i) => (
                <input
                    className='VisualSixInputsVerifyCode__input'
                    required
                    key={i}
                    ref={(el) => { inputsRef.current[i] = el }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    defaultValue={vals[i]}
                    onChange={(e) => handleChange(e, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    onPaste={(e) => handlePaste(e, i)}
                    disabled={disabled}
                    aria-label={`Dígito ${i + 1}`}
                />
            ))}
        </div>
    );
};

export default VisualSixInputsVerifyCode;
