import { companiesService } from '@zelly/core/services/companiesService';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import Toast from '../../components/Toast';
import { toggleLoading } from '../ui/uiSlice';
import { companiesActions } from './sagaActions';

export type CompanyPayload = {
  type: keyof typeof companiesActions;
};

export function* getAllCompanies() {
  const { getAll: fetchCompanies } = companiesService;

  yield put(toggleLoading(true));

  try {
    yield call(() => fetchCompanies());
    yield put(toggleLoading(false));
  } catch (e: any) {
    yield put(toggleLoading(false));

    Toast.showToast({
      type: 'error',
      text1: 'Error',
      text2: e.message || '',
    });

    console.log(e.message);
  }
}

export function runFetchAllCompanies() {
  console.log('first');
  return {
    type: companiesActions.GET_ALL_COMPANIES,
  };
}

export function* watchGetAllCompanies() {
  yield takeEvery(companiesActions.GET_ALL_COMPANIES, getAllCompanies);
}

export function* companiesSagas() {
  yield all([watchGetAllCompanies()]);
}
