import { RootState } from '@zelly/core/redux/storeWeb';
import { ComponentType, FC, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

export const withAuth =
  <P extends object>(Component: ComponentType<P>): FC<P> =>
  ({ ...props }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const fetchedToken = useSelector((state: RootState) => state.user.user?.token);

    const shouldNavigateAway = useCallback(() => {
      const { pathname } = location;

      if (!fetchedToken && pathname !== '/login' && pathname !== '/register') {
        navigate('/login', { replace: true });
      }
    }, [fetchedToken, location, navigate]);

    useEffect(() => {
      shouldNavigateAway();
    }, [fetchedToken, shouldNavigateAway]);

    return <Component {...(props as P)} />;
  };
