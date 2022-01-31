import { all, put, takeEvery } from "redux-saga/effects";
import { toggleLoading } from "../ui/uiSlice";
import { uiActions } from "./sagaActions";

export type UIShowLoaderPayload = {
  type: keyof typeof uiActions;
  showLoading: boolean;
};

function* showLoading({ showLoading }: UIShowLoaderPayload) {
  yield put(toggleLoading(showLoading));
}

export function runShowLoading({ showLoading }: UIShowLoaderPayload) {
  return {
    type: uiActions.SHOW_SPINNER,
    showLoading,
  };
}

export function* watchShowLoading() {
  yield takeEvery(uiActions.SHOW_SPINNER, showLoading);
}

export function* uiSagas() {
  yield all([watchShowLoading()]);
}
