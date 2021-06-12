import {takeEvery} from '@redux-saga/core/effects';
import {open} from './actions';

export function* openSaga() {
  console.log('============ Hello Sagas!');
}

export function* watchOpen() {
  yield takeEvery(open, openSaga);
}

export const feedSagas = [watchOpen];
