import {AnyAction} from 'redux';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 1,
};

export const counter = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};
