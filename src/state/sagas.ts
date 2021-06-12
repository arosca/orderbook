import {compose} from 'redux';
import {put, takeEvery, all, fork} from 'redux-saga/effects';
import {feedSagas} from './feed/sagas';

const forkSagas = sagas => {
  return sagas.flat().map(s => s());
};

export function* sagas() {
  yield all(forkSagas([feedSagas]));
}
