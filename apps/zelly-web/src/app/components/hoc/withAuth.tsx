import React, { ComponentType, FC, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@zelly/core/redux/storeWeb';
import { useLocation, useNavigate } from 'react-router-dom';

export const withAuth =
  <P extends object>(Component: ComponentType<P>): FC<P> =>
  ({ ...props }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const userToken = useSelector(
      (state: RootState) => state.auth.authenticated
    );

    const isAtRouteToRedirect =
      location.pathname === '/login' || location.pathname === '/register';

    const shouldNavigateAway = useCallback(() => {
      const { pathname } = location;
      if (!userToken && pathname !== '/login' && pathname !== '/register') {
        navigate('/', { replace: true });
      }
      if (userToken && isAtRouteToRedirect) {
        navigate('/', { replace: true });
      }
    }, []);

    useEffect(() => {
      shouldNavigateAway();
    }, [shouldNavigateAway, userToken]);

    return <Component {...(props as P)} />;
  };
