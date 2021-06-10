import {createAction} from '@reduxjs/toolkit';
import {WEBSOCKET_OPEN, DEFAULT_PREFIX} from '@giantmachines/redux-websocket';

const makeActionType = (key: string) => DEFAULT_PREFIX + '::' + key;

export const open = createAction(makeActionType(WEBSOCKET_OPEN));
