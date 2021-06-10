import {createReducer} from '@reduxjs/toolkit';
import * as actions from './actions';

const initialState = {
  value: 1111,
};

export const feedReducer = createReducer(initialState, builder => {
  builder.addCase(actions.open, state => {
    state.value++;
  });
});
