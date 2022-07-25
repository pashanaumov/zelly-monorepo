import AsyncStorage from '@react-native-async-storage/async-storage';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import Toast from '../../components/Toast';
import { authService } from './authService';
import { UserAdminResponse, UserResponse } from '../../types/Auth/LoginResponse';
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
  const { login } = authService;
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

    Toast.showToast({
      type: 'error',
      text1: 'Error',
      text2: 'Invalid credentials. Please try again',
    });

    console.log(e.message);
  }
}

function* loginAdminUser(payload: LoginUserPayload) {
  const { email, password } = payload;
  const { loginAdmin } = authService;
  yield put(toggleLoading(true));
  try {
    const user: UserAdminResponse = yield call(() => loginAdmin(email, password));

    if (!user) {
      yield put(toggleLoading(false));
    }

    if (user.token && user.isAdmin) {
      yield put(authUser(user.token));
      yield put(setUser({ user }));
      yield put(toggleLoading(false));
    }
  } catch (e: any) {
    yield put(toggleLoading(false));

    Toast.showToast({
      type: 'error',
      text1: 'Error',
      text2: 'Your are not an admin',
    });

    console.log(e.message);
  }
}

export function* watchloginUser() {
  yield takeEvery(sagaActions.LOGIN_USER, loginUser);
}

export function* watchloginAdminUser() {
  yield takeEvery(sagaActions.LOGIN_USER_ADMIN, loginAdminUser);
}

function* logoutUser() {
  yield put(authUser(null));
  yield put(setUser({ user: null }));
  yield AsyncStorage.clear();
}

export function* watchLogoutUser() {
  yield takeEvery(sagaActions.LOGOUT_USER, logoutUser);
}

export function runFetchData(payload: { email: UserEmail; password: UserPassword }) {
  return {
    type: sagaActions.LOGIN_USER,
    email: payload.email,
    password: payload.password,
  };
}

export function runFetchAdminData(payload: { email: UserEmail; password: UserPassword }) {
  return {
    type: sagaActions.LOGIN_USER_ADMIN,
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
  yield all([watchloginUser(), watchloginAdminUser(), watchLogoutUser()]);
}
