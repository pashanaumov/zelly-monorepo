import React from 'react';
import { Platform } from 'react-native';
import ToastNative from 'react-native-toast-message';

type ToastProps = { type?: string; text1?: string; text2?: string };

const Toast = {
  showToast({ type, text1, text2 }: ToastProps) {
    if (Platform.OS === 'web') return;
    ToastNative.show({
      type,
      text1,
      text2,
    });
  },
};

export default Toast;
