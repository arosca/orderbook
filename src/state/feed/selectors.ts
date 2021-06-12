import {createSelector} from 'reselect';
import {RootState} from '../store';

const getState = (state: RootState) => state.feedReducer;
export const getIsOpen = createSelector(getState, state => state.isOpen);
export const getData = createSelector(getState, state => state.data);
export const getBids = createSelector(getData, state => state.bids);
export const getAsks = createSelector(getData, state => state.asks);
