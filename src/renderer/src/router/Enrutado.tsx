import Login from '@renderer/page/Login';
import { useEffect } from 'react';
import { Route, HashRouter as Router, Routes } from 'react-router';
import ProtectiveRoute from './ProtectiveRoute';
import { useSelector } from 'react-redux';
import Dashboard from '@renderer/page/Dashboard';
import Users from '@renderer/page/Users';
import Inicio from '@renderer/page/inicio';
import Empleados from '@renderer/page/Empleados';
import Cargos from '@renderer/page/Cargos';
import Roles from '@renderer/page/Roles';
import PuntoVenta from '@renderer/page/PuntoVenta';
import Empleadores from '@renderer/page/Empleadores';
import User from '@renderer/page/User';
import Reportes from '@renderer/page/Reportes';

function Enrutado(props) {
  const userData = useSelector((state: any) => state.loginAccess.validationAccess);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route element={<ProtectiveRoute canActivate={userData} />}>
            <Route path='dashboard' element={<Dashboard />} >
              <Route path='init' element={<Inicio />} />
              <Route path='users' element={<Users />} />
              <Route path='pSale' element={<PuntoVenta />} />
              <Route path='employe' element={<Empleados />} />
              <Route path='ausentismo' element={<h2>Ausentismo</h2>} />
              <Route path='report' element={<Reportes />} />
              <Route path='roles' element={<Roles />} />
              <Route path='cargos' element={<Cargos />} />
              <Route path='contracts' element={<h2>Contratos</h2>} />
              <Route path='empleadores' element={<Empleadores />} />
              <Route path='user' element={<User />} />
            </Route >
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default Enrutado;