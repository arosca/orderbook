import {createSelector} from 'reselect';
import {RootState} from '../store';

const getState = (state: RootState) => state.feedReducer;
export const getValue = createSelector(getState, state => state.value);
