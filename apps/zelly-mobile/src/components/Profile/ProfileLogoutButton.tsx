import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { runLogoutUser } from '@zelly/core/redux/sagas/authSaga';

export const ProfileLogoutButton = () => {
  const dispatch = useDispatch();

  function logoutUser() {
    dispatch(runLogoutUser());
  }

  return (
    <View style={styles.buttonContainer}>
      <Button mode="contained" onPress={logoutUser}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 16,
    marginBottom: 32,
  },
});
