export const extraerHora = (isoString: string): string => {
  return isoString.substring(11, 16); // De "1970-01-01T08:30:00.000Z" → "08:30"
};


