import axios, { AxiosError } from 'axios';
import { Platform } from 'react-native';
import { store as storeWeb } from '../redux/storeWeb';
import { store as storeNative } from '../redux/storeNative';
import { runLogoutUser } from '../redux/sagas/authSaga';

function dispatchLogout() {
  if (Platform.OS === 'web') {
    return storeWeb.dispatch(runLogoutUser());
  }
  return storeNative.dispatch(runLogoutUser());
}

export function jwtAuthInterceptor() {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response && error.response.status === 401) {
        dispatchLogout();
      }
      return error;
    },
  );
}
