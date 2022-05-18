import { all, call, put, takeEvery } from 'redux-saga/effects';
import Toast from '../../components/Toast';
import { authService } from '../../services/authService';
import { UserResponse } from '../../types/Auth/LoginResponse';
import { UserCountry } from '../../types/Utility/User';
import { authUser } from '../authSlice';
import { toggleLoading } from '../ui/uiSlice';
import { setUser } from '../userSlice';
import { LoginUserPayload } from './authSaga';
import { sagaActions } from './sagaActions';

export type RegisterUserPayload = LoginUserPayload & {
  country: UserCountry;
};

function* registerUser(payload: RegisterUserPayload) {
  const { register } = authService();
  yield put(toggleLoading(true));
  try {
    const user: UserResponse = yield call(() => register(payload));
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
      text2: 'Error registering',
    });
    console.log(e);
  }
}

export function* watchRegisterUser() {
  yield takeEvery(sagaActions.REGISTER_USER, registerUser);
}

export function runRegisterUser(payload: Omit<RegisterUserPayload, 'type'>) {
  const { email, password, country } = payload;
  return {
    type: sagaActions.REGISTER_USER,
    email,
    password,
    country,
  };
}

export function* registrationSagas() {
  yield all([watchRegisterUser()]);
}
