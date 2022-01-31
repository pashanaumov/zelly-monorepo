import { Platform } from 'react-native';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { useAuthService } from '../../services/AuthService';
import { UserResponse } from '../../types/Auth/LoginResponse';
import { UserEmail, UserPassword } from '../../types/Utility/User';
import { authUser } from '../authSlice';
import { toggleLoading } from '../ui/uiSlice';
import { setUser } from '../userSlice';
import { sagaActions } from './sagaActions';

export type LoginUserPayload = {
  type: keyof typeof sagaActions;
  password: UserPassword;
  email: UserEmail;
};

function* loginUser(payload: LoginUserPayload) {
  const { email, password } = payload;
  const { login } = useAuthService();
  yield put(toggleLoading(true));
  try {
    const user: UserResponse = yield call(() => login(email, password));
    if (user.token) {
      yield put(authUser(user.token));
      yield put(setUser({ user }));
      yield put(toggleLoading(false));
    }
  } catch (e: any) {
    yield put(toggleLoading(false));

    if (Platform.OS !== 'web') {
      // @TODO: CHANGE
      // Toast.showToast("error", "Error", e.message || "");
    }
    console.log(e.message);
  }
}

export function* watchloginUser() {
  yield takeEvery(sagaActions.LOGIN_USER, loginUser);
}

function* logoutUser() {
  yield put(authUser(null));
  yield put(setUser({ user: null }));
}

export function* watchLogoutUser() {
  yield takeEvery(sagaActions.LOGOUT_USER, logoutUser);
}

export function runFetchData(payload: {
  email: UserEmail;
  password: UserPassword;
}) {
  return {
    type: sagaActions.LOGIN_USER,
    email: payload.email,
    password: payload.password,
  };
}

export function runLogoutUser() {
  return {
    type: sagaActions.LOGOUT_USER,
  };
}

export function* authSagas() {
  yield all([watchloginUser(), watchLogoutUser()]);
}
