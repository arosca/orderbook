import {configureStore} from '@reduxjs/toolkit';
import reduxWebsocket from '@giantmachines/redux-websocket';

import {reducer} from './reducer';

const reduxWebsocketMiddleware = reduxWebsocket();

export const store = configureStore({
  reducer,
  middleware: [reduxWebsocketMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
