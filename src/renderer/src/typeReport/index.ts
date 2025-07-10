import { faBell, faCalendar, faCalendarDay, faCalendarDays, faCalendarWeek, faCalendarXmark, faClockFour, faFileExport, faRightFromBracket, faShuffle, faTrash, faUserTie } from '@fortawesome/free-solid-svg-icons';

export const typeReports: Array<object> = [

    {
        icon: faFileExport,
        reportName: 'Asistencias general',
        typeReport: 'general'
    }, {
        icon: faCalendarDay,
        reportName: 'Asistencias diaria',
        typeReport: 'general'
    }, {
        icon: faCalendarWeek,
        reportName: 'Asistencias semanal',
        typeReport: 'general'
    }, {
        icon: faCalendarDays,
        reportName: 'Asistencias mensual',
        typeReport: 'general'
    }, {
        icon: faUserTie,
        reportName: 'Asistencias por empleado',
        typeReport: 'general'
    }, {
        icon: faShuffle,
        reportName: 'Asistencias por turno',
        typeReport: 'general'
    }, {
        icon: faCalendarXmark,
        reportName: 'Ausencias',
        typeReport: 'control_analisis'
    }, {
        icon: faClockFour,
        reportName: 'Entrada tarde',
        typeReport: 'control_analisis'
    }, {
        icon: faBell,
        reportName: 'Entrada temprana',
        typeReport: 'control_analisis'
    }, {
        icon: faRightFromBracket,
        reportName: 'Salida temprana',
        typeReport: 'control_analisis'
    },


]