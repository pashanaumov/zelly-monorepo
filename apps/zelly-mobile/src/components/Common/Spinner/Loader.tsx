import React from 'react';
import { View, ViewStyle } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '@zelly/core/redux/storeNative';

export const Loader = () => {
  const isVisible = useSelector((state: RootState) => state.ui.showLoading);

  if (!isVisible) {
    return <></>;
  }

  return (
    <View style={styles.ViewContainer as ViewStyle}>
      <ActivityIndicator
        size="large"
        color={'white'}
        style={styles.MainSpinner}
      />
    </View>
  );
};

const styles = {
  ViewContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2,
  },
  MainSpinner: {
    height: 100,
    width: 100,
  },
};
