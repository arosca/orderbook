import {createReducer} from '@reduxjs/toolkit';
import {message, open} from './actions';
import {markets} from './constants';

type State = {
  market: typeof markets.PI_XBTUSD | typeof markets.PI_ETHUSD;
  isOpen: boolean;
  data: {
    bids: number[][];
    asks: number[][];
  };
};

const initialState: State = {
  market: markets.PI_XBTUSD,
  isOpen: false,
  data: {
    bids: [],
    asks: [],
  },
};

const addTotal = (rows: number[][]): number[][] => {
  let total = 0;
  return rows.map(row => [row[0], row[1], (total += row[1])]);
};

export const feedReducer = createReducer(initialState, builder => {
  builder
    .addCase(open, state => {
      state.isOpen = true;
    })
    .addCase(message, (state, action) => {
      const data = action.payload.message;
      if (data.feed === 'book_ui_1_snapshot') {
        state.data = {
          bids: addTotal(data.bids),
          asks: addTotal(data.asks).reverse(),
        };
      }
    });
});
