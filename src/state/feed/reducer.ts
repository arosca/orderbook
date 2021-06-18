import {compose, createReducer} from '@reduxjs/toolkit';
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

// const sortDesc = (a: number[], b: number[]) => (a[0] > b[0] ?( -1: number[]) : 1);
// const sortAsc = (a: number[], b: number[]) => (a[0] > b[0] ? 1 : -1);

const sortDesc = (row: number[][]) =>
  row.sort((a: number[], b: number[]) => (a[0] > b[0] ? -1 : 1));
const sortAsc = (row: number[][]) =>
  row.sort((a: number[], b: number[]) => (a[0] > b[0] ? 1 : -1));

const slice = (rows: number[][]) => rows.slice(0, 12);

const mergeRows = (newRows: number[][], rows: number[][]) => {
  const prices = newRows.map(i => i[0]);
  const data = rows.filter(row => !prices.includes(row[0]));
  return [...data, ...newRows].filter(i => i[1] !== 0);
};

// const mergeRows = (newRows: number[][], rows: number[][]) => {
//   const prices = newRows.map(i => i[0]);
//   const data = rows.filter(row => !prices.includes(row[0]));
//   return [...data, ...newRows].filter(i => i[1] !== 0);
// };

// const rows = [
//   [3, 3],
//   [1, 1],
//   [2, 2],
// ];
// const newRows = [
//   [2, 3],
//   [1, 2],

//   [3, 0],
//   [4, 4],
// ];

const formatBids = compose(addTotal, slice, sortAsc, mergeRows);
const formatAsks = compose(addTotal, slice, sortDesc, mergeRows);
// const sample = formatRows(newRows, rows);
// console.log('--------------- result', sample);

export const feedReducer = createReducer(initialState, builder => {
  builder
    .addCase(open, state => {
      state.isOpen = true;
    })
    .addCase(message, (state, action) => {
      const data = action.payload.message;
      if (data.feed === 'book_ui_1_snapshot') {
        state.data = {
          bids: addTotal(data.bids).slice(0, 12),
          asks: addTotal(data.asks).slice(0, 12),
        };
      }
      if (data.feed === 'book_ui_1' && data.bids && data.asks) {
        state.data = {
          bids: formatBids(data.bids, state.data.bids),
          asks: formatAsks(data.asks, state.data.asks),
        };
      }
    });
});

// compose = merge sort slice addTotal
