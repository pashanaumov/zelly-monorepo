import { ComponentType, FC, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@zelly/core/redux/storeWeb';
import { useLocation, useNavigate } from 'react-router-dom';

export const withAuth =
  <P extends object>(Component: ComponentType<P>): FC<P> =>
  ({ ...props }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const fetchedToken = useSelector(
      (state: RootState) => state.user.user?.token,
    );

    const isAtMainPage = location.pathname === '/';

    const shouldNavigateAway = useCallback(() => {
      const { pathname } = location;

      if (!fetchedToken && pathname !== '/login' && pathname !== '/register') {
        navigate('/', { replace: true });
      }
      if (fetchedToken && pathname === '/login') {
        navigate('/dashboard', { replace: true });
      }
      if (fetchedToken && pathname === '/register') {
        navigate('/dashboard', { replace: true });
      }
      if (fetchedToken && isAtMainPage) {
        navigate('/dashboard', { replace: true });
      }
    }, [fetchedToken, isAtMainPage, location, navigate]);

    useEffect(() => {
      shouldNavigateAway();
    }, [fetchedToken, shouldNavigateAway]);

    return <Component {...(props as P)} />;
  };
