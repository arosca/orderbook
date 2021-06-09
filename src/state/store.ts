import {configureStore, createSelector} from '@reduxjs/toolkit';

import {counter} from './reducer';

export const store = configureStore({
  reducer: {
    counter,
  },
});

const getCounter = (state: RootState) => state.counter;
export const getValue = createSelector(
  getCounter,
  counterState => counterState.value,
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
