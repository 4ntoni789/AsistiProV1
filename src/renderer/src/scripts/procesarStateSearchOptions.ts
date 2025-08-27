export const procesarStateSearchOptions = (stateSearchOptions: string): string => {
  switch (stateSearchOptions) {
    case 'contratro_inactivo': {
      return 'Inactivo'

    }
    case 'contratro_vencidos': {
      return 'VENCIDO'
    }
    default:
      return 'Activo';
  }
}