import { faCircleCheck, faContactBook, faFileContract, faFingerprint, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export const validarIcon = (text: string): IconDefinition => {
    switch (text) {
        case 'login':
            return faCircleCheck;
        case 'contratos-vencer-vencidos':
            return faFileContract
        case 'nuevas-marcaciones' :
            return faFingerprint
        default:
            return faQuestionCircle; // ícono por defecto
    }
};
