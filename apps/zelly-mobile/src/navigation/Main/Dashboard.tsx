import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { runLogoutUser } from '@zelly/core/redux/sagas/authSaga';
import type { RootState } from '@zelly/core/redux/storeNative';
import Background from '../../components/Common/Background';
import Logo from '../../components/Common/Logo';
import Header from '../../components/Common/Header';
import Paragraph from '../../components/Common/Paragraph';
import Button from '../../components/Common/Button/Button';

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  function logoutUser() {
    dispatch(runLogoutUser());
  }

  return (
    <Background>
      <Logo />
      <Header>Let’s start</Header>

      <Paragraph>Email: {user.email}</Paragraph>
      <Paragraph>UserId: {user.id}</Paragraph>
      <Paragraph>Country: {user.country}</Paragraph>

      <Button mode="outlined" onPress={logoutUser}>
        Logout
      </Button>
    </Background>
  );
};

export default memo(Dashboard);
