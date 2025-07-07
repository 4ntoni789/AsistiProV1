import { ProtectiveRouteProps } from '@renderer/interface';
import React from 'react';
import { Navigate, Outlet} from 'react-router';


const ProtectiveRoute: React.FC<ProtectiveRouteProps> = ({ canActivate, redirectPath = '/' }) => {

  if (!canActivate) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default ProtectiveRoute;