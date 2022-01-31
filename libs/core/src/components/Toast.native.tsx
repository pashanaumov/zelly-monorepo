import React from "react";
import { Platform } from "react-native";
import ToastNative from "react-native-toast-message";

const Toast = {
  showToast(type: string, text1: string, text2: string) {
    if (Platform.OS === "web") return;
    ToastNative.show({
      type,
      text1,
      text2,
    });
  },
};

export default Toast;
