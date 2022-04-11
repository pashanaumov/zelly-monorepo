import { all } from 'redux-saga/effects';
import { authSagas } from './authSaga';
import { companiesSagas } from './companiesSaga';
import { registrationSagas } from './registerSaga';
import { uiSagas } from './uiSaga';

export default function* rootSaga() {
  yield all([authSagas(), registrationSagas(), uiSagas(), companiesSagas()]);
}
