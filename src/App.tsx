import React from 'react';
import {Text, SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Provider} from 'react-redux';
import {useAppSelector} from './hooks';

import {getValue, store} from './state/store';

// const subscribeMessage = {
//   event: 'subscribe',
//   feed: 'book_ui_1',
//   product_ids: ['PI_XBTUSD'],
// };
// const WS_SUBSCRIBE_MESSAGE = JSON.stringify(subscribeMessage);
// const WS_URL = 'wss://www.cryptofacilities.com/ws/v1';

const Orderbook = () => {
  const value = useAppSelector(getValue);
  return <Text>{value}</Text>;
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
