import {configureStore} from '@reduxjs/toolkit';
import reduxWebsocket from '@giantmachines/redux-websocket';
import createSagaMiddleware from 'redux-saga';

import {reducer} from './reducer';
import {sagas} from './sagas';

const deserializer = (data: any) => {
  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
};

const reduxWebsocketMiddleware = reduxWebsocket({deserializer});
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer,
  middleware: [reduxWebsocketMiddleware, sagaMiddleware],
});
sagaMiddleware.run(sagas);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
