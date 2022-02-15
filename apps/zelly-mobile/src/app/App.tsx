import React from 'react';
import { RootState } from '@zelly/core/redux/storeNative';
import { useSelector } from 'react-redux';
import { Loader } from '../components/Common/Spinner/Loader';
import { AuthStack, MainTabs } from '../navigation/AppNavigator';

export const App = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <>
      <Loader />
      {user ? <MainTabs /> : <AuthStack />}
    </>
  );
};
