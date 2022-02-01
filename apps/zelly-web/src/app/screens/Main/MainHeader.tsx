import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@zelly/core/redux/storeWeb';
import { sagaActions } from '@zelly/core/redux/sagas/sagaActions';

export const MainHeader = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.user);

  async function onLogout() {
    dispatch({ type: sagaActions.LOGOUT_USER });
  }

  const LoginButton = () =>
    user ? (
      <Link to="/" onClick={onLogout}>
        Logout
      </Link>
    ) : (
      <Link to="/login">Login</Link>
    );

  return (
    <>
      <h1>Welcome to Zelly</h1>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <LoginButton />{' '}
        {!user && (
          <>
            | <Link to={'/register'}>Register</Link>{' '}
          </>
        )}
      </nav>
    </>
  );
};
