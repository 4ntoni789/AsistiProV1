import { typeReports } from '../typeReport/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function ContainerReportes({ seleted, setSeleted }) {
  return (
    <>
      <div className='App__init__Reporte__header'>
        <h2>Reportes de Período</h2>
      </div>
      <div className='App__init__Reporte__contReporte'>
        {
          typeReports.map((report: any, i) => (
            report.typeReport == 'general' ? <div key={i} className={seleted == report.reportName ? 'App__init__Reporte__contSingleReporte__active' : 'App__init__Reporte__contSingleReporte'}
              onClick={() => setSeleted(report.reportName)}>
              <FontAwesomeIcon icon={report.icon} />
              <span>{report.reportName}</span>
            </div> : null
          ))
        }
      </div>
      <div className='App__init__Reporte__header'>
        <h2>Reportes de Control y Análisis</h2>
      </div>
      <div className='App__init__Reporte__contReporte'>
        {
          typeReports.map((report: any, i) => (
            report.typeReport == 'control_analisis' ? <div key={i} className={seleted == report.reportName ? 'App__init__Reporte__contSingleReporte__active' : 'App__init__Reporte__contSingleReporte'}
              onClick={() => setSeleted(report.reportName)}>
              <FontAwesomeIcon icon={report.icon} />
              <span>{report.reportName}</span>
            </div> : null
          ))
        }
      </div>
    </>
  );
}

export default ContainerReportes;