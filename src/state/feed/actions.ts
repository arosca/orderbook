import {createAction} from '@reduxjs/toolkit';
import {
  WEBSOCKET_OPEN,
  DEFAULT_PREFIX,
  WEBSOCKET_MESSAGE,
} from '@giantmachines/redux-websocket';

const makeActionType = (key: string) => DEFAULT_PREFIX + '::' + key;

export type Message = {
  message: {
    feed: string;
    bids: [];
    asks: [];
    product_id: string;
  };
};

export const open = createAction(makeActionType(WEBSOCKET_OPEN));
export const subscribe = createAction('SUBSCRIBE');
export const message = createAction<Message>(makeActionType(WEBSOCKET_MESSAGE));
