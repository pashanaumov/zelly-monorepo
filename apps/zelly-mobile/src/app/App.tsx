import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@zelly/core/redux/storeNative';
import { AuthStack, MainStack } from '../navigation/AppNavigator';
import { Loader } from '../components/Common/Spinner/Loader';

export const App = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <>
      <Loader />
      {user ? <MainStack /> : <AuthStack />}
    </>
  );
};
