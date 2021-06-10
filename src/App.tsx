import React, {useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Button,
} from 'react-native';
import {Provider} from 'react-redux';
import {connect} from '@giantmachines/redux-websocket';

import {useAppDispatch, useAppSelector} from './hooks';

import {store} from './state/store';
import {getValue} from './state/feed/selectors';

// const subscribeMessage = {
//   event: 'subscribe',
//   feed: 'book_ui_1',
//   product_ids: ['PI_XBTUSD'],
// };
// const WS_SUBSCRIBE_MESSAGE = JSON.stringify(subscribeMessage);
const WS_URL = 'wss://www.cryptofacilities.com/ws/v1';

const Orderbook = () => {
  const value = useAppSelector(getValue);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(connect(WS_URL));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Text>{value}</Text>
      <Button onPress={() => undefined} title="toggle" />
    </>
  );
};

export const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <SafeAreaView>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Orderbook />
      </SafeAreaView>
    </Provider>
  );
};
