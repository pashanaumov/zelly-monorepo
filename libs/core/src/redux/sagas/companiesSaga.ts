import { all, put, takeEvery } from 'redux-saga/effects';
import { toggleLoading } from '../ui/uiSlice';
import { companiesActions } from './sagaActions';
import { CompanyProperties } from '../../types/Companies/Company';
import { setCompanies } from '../userCompaniesSlice';

export type CompanyPayload = {
  type: keyof typeof companiesActions;
  favouriteCompanies: CompanyProperties[];
};

export function* storeFavouriteCompanies({ favouriteCompanies }: CompanyPayload) {
  yield put(toggleLoading(true));
  yield put(setCompanies({ companies: favouriteCompanies }));
  yield put(toggleLoading(false));
}

export function runFetchAllCompanies({ favouriteCompanies }: CompanyPayload) {
  return {
    type: companiesActions.UPDATE_FAVOURITE_COMPANIES,
    favouriteCompanies,
  };
}

export function* watchGetAllCompanies() {
  yield takeEvery(companiesActions.UPDATE_FAVOURITE_COMPANIES, storeFavouriteCompanies);
}

export function* companiesSagas() {
  yield all([watchGetAllCompanies()]);
}
