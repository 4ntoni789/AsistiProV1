import { UAParser } from "ua-parser-js";

export const userAgentInfo = (userAgent: string) => {
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    const appMatch = userAgent.match(/([A-Za-z]+Pro)\/([\d.]+)/);
    if (appMatch) {
        return `${appMatch[1]}`; // Ejemplo: "AsistiPro 1.0.0"
    }

    // Si no, devuelvo navegador normal
    return `${result.browser.name}`;
}